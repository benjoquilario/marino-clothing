"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { redirect } from "next/navigation"
import { getUserById } from "./user"
import { getCurrentCart } from "./cart"
import { orders, orderItems, carts, products } from "@/db/schema"
import { isRedirectError } from "next/dist/client/components/redirect"
import { insertOrderSchema } from "@/lib/validators/payment"
import { eq, desc, count } from "drizzle-orm"

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
