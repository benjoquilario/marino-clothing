import React from "react"
import OrderDetailsForm from "../_components/order-detail.form"
import { getOrderById } from "@/server/order"
import { notFound } from "next/navigation"
import { env } from "@/env.mjs"

const OrderDetails = async ({
  params: { id },
}: {
  params: {
    id: string
  }
}) => {
  const order = await getOrderById(id)

  if (!order) notFound()

  return (
    <OrderDetailsForm
      paypalClientId={env.PAYPAL_CLIENT_ID || "sb"}
      order={order}
    />
  )
}

export default OrderDetails
