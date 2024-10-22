"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { redirect } from "next/navigation"
import { getUserById } from "./user"
import { getCurrentCart } from "./cart"
import { orders, orderItems, carts, products, users } from "@/db/schema"
import { isRedirectError } from "next/dist/client/components/redirect"
import { insertOrderSchema } from "@/lib/validations/payment"
import { eq, desc, count, sql, sum } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const createOrder = async () => {
  try {
    const session = await auth()

    if (!session) throw new Error("User is not authenticated")

    const userId = session.user.id

    const cart = await getCurrentCart()
    const user = await getUserById(userId!)

    if (!cart || cart.items.length === 0) redirect("/cart")

    if (!user.address) redirect("/shipping")

    if (!user.paymentMethod) redirect("/payment")

    const order = insertOrderSchema.parse({
      userId: user.id,
      shippingAddress: user.address,
      paymentMethod: user.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    })

    const insertedOrderId = await db.transaction(async (tx) => {
      const insertedOrder = await tx.insert(orders).values(order).returning()
      for (const item of cart.items) {
        await tx.insert(orderItems).values({
          ...item,
          price: item.price.toFixed(2),
          orderId: insertedOrder[0].id,
        })
      }

      await db
        .update(carts)
        .set({
          items: [],
          totalPrice: "0",
          shippingPrice: "0",
          taxPrice: "0",
          itemsPrice: "0",
        })
        .where(eq(carts.id, cart.id))
      return insertedOrder[0].id
    })

    if (!insertedOrderId) throw new Error("Order not created")
    redirect(`/order/${insertedOrderId}`)
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    return { success: false, message: error }
  }
}

export async function getOrderById(orderId: string) {
  return await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
    with: {
      orderItems: true,
      user: { columns: { name: true, email: true } },
    },
  })
}

export async function getCurrentOrders({
  limit = 12,
  page,
}: {
  limit?: number
  page: number
}) {
  const session = await auth()

  if (!session) throw new Error("User is not authenticated")

  const userId = session.user.id

  const data = await db.query.orders.findMany({
    where: eq(orders.userId, userId!),
    orderBy: [desc(products.createdAt)],
    limit,
    offset: (page - 1) * limit,
  })

  const dataCount = await db
    .select({ count: count() })
    .from(orders)
    .where(eq(orders.userId, userId!))

  return {
    data,
    totalPages: Math.ceil(dataCount[0].count / limit),
  }
}

export async function getOrderSummary() {
  const ordersCount = await db.select({ count: count() }).from(orders)
  const productsCount = await db.select({ count: count() }).from(products)
  const usersCount = await db.select({ count: count() }).from(users)
  const ordersPrice = await db
    .select({ sum: sum(orders.totalPrice) })
    .from(orders)

  const salesData = await db
    .select({
      months: sql<string>`to_char(${orders.createdAt},'MM/YY')`,
      totalSales: sql<number>`sum(${orders.totalPrice})`.mapWith(Number),
    })
    .from(orders)
    .groupBy(sql`1`)

  const latestOrders = await db.query.orders.findMany({
    orderBy: [desc(orders.createdAt)],
    with: {
      user: { columns: { name: true } },
    },
    limit: 6,
  })

  return {
    ordersCount,
    productsCount,
    usersCount,
    ordersPrice,
    salesData,
    latestOrders,
  }
}

export async function getAllOrders({
  limit = 3,
  page,
}: {
  limit?: number
  page: number
}) {
  const data = await db.query.orders.findMany({
    orderBy: [desc(products.createdAt)],
    limit,
    offset: (page - 1) * limit,
    with: { user: { columns: { name: true } } },
  })
  const dataCount = await db.select({ count: count() }).from(orders)

  return {
    data,
    totalPages: Math.ceil(dataCount[0].count / limit),
  }
}

// DELETE
export async function deleteOrder(id: string) {
  try {
    await db.delete(orders).where(eq(orders.id, id))

    revalidatePath("/admin/orders")

    return {
      success: true,
      message: "Order deleted successfully",
    }
  } catch (error) {
    return { success: false, message: error }
  }
}
