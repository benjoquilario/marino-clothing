"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { redirect } from "next/navigation"
import { getUserById } from "./user"
import { getCurrentCart } from "./cart"
import { orders, orderItems, carts } from "@/db/schema"
import { isRedirectError } from "next/dist/client/components/redirect"
import { insertOrderSchema } from "@/lib/validators/payment"
import { eq } from "drizzle-orm"

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
