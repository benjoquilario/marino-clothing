import ShippingAddressForm from "./_components/shipping-form"
import { notFound, redirect } from "next/navigation"
import type { Metadata } from "next"
import { APP_NAME } from "@/lib/constant"
import { getCurrentCart } from "@/server/cart"
import { auth } from "@/auth"
import { getUserById } from "@/server/user"

export const metadata: Metadata = {
  title: `Shipping Address - ${APP_NAME}`,
}

export default async function ShippingPage() {
  const cart = await getCurrentCart()

  if (!cart || cart.items.length === 0) redirect("/cart")

  const session = await auth()

  if (!session) notFound()

  const userId = session.user.id

  const user = await getUserById(userId!)

  return <ShippingAddressForm address={user.address} />
}
