"use server"

import { db } from "@/db"
import { orders, products } from "@/db/schema"
import { eq, sql } from "drizzle-orm"
import { paypal } from "@/lib/payments/paypal"
import { revalidatePath } from "next/cache"
import { type PaymentResult } from "@/lib/validators/payment"

export async function createPayPalOrder(orderId: string) {
  try {
    const order = await db.query.orders.findFirst({
      where: eq(orders.id, orderId),
    })
    if (order) {
      const paypalOrder = await paypal.createOrder(Number(order.totalPrice))
      await db
        .update(orders)
        .set({
          paymentResult: {
            id: paypalOrder.id,
            email_address: "",
            status: "",
            pricePaid: "0",
          },
        })
        .where(eq(orders.id, orderId))
      return {
        success: true,
        message: "PayPal order created successfully",
        data: paypalOrder.id,
      }
    } else {
      throw new Error("Order not found")
    }
  } catch (err) {
    return { success: false, message: err }
  }
}

export async function approvePayPalOrder(
  orderId: string,
  data: { orderID: string }
) {
  try {
    const order = await db.query.orders.findFirst({
      where: eq(orders.id, orderId),
    })
    if (!order) throw new Error("Order not found")

    const captureData = await paypal.capturePayment(data.orderID)
    if (
      !captureData ||
      captureData.id !== order.paymentResult?.id ||
      captureData.status !== "COMPLETED"
    )
      throw new Error("Error in paypal payment")
    await updateOrderToPaid({
      orderId,
      paymentResult: {
        id: captureData.id,
        status: captureData.status,
        email_address: captureData.payer.email_address,
        pricePaid:
          captureData.purchase_units[0]?.payments?.captures[0]?.amount?.value,
      },
    })
    revalidatePath(`/order/${orderId}`)
    return {
      success: true,
      message: "Your order has been successfully paid by PayPal",
    }
  } catch (err) {
    return { success: false, message: err }
  }
}

export const updateOrderToPaid = async ({
  orderId,
  paymentResult,
}: {
  orderId: string
  paymentResult?: PaymentResult
}) => {
  const order = await db.query.orders.findFirst({
    columns: { isPaid: true },
    where: eq(orders.id, orderId),
    with: { orderItems: true },
  })

  if (!order) throw new Error("Order not found")

  if (order.isPaid) throw new Error("Order is already paid")

  await db.transaction(async (tx) => {
    for (const item of order.orderItems) {
      await tx
        .update(products)
        .set({
          stock: sql`${products.stock} - ${item.qty}`,
        })
        .where(eq(products.id, item.productId))
    }

    await tx
      .update(orders)
      .set({
        isPaid: true,
        paidAt: new Date(),
        paymentResult,
      })
      .where(eq(orders.id, orderId))
  })

  const updatedOrder = await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
    with: { orderItems: true, user: { columns: { name: true, email: true } } },
  })

  if (!updatedOrder) {
    throw new Error("Order not found")
  }

  // await sendPurchaseReceipt({ order: updatedOrder })
}
