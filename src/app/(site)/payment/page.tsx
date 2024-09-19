import { Metadata } from "next"

import { auth } from "@/auth"
import { APP_NAME } from "@/lib/constant"
import { getUserById } from "@/server/user"
import PaymentMethodForm from "./_components/payment-form"

export const metadata: Metadata = {
  title: `Payment Method - ${APP_NAME}`,
}

export default async function PaymentMethodPage() {
  const session = await auth()
  const user = await getUserById(session?.user.id!)
  return <PaymentMethodForm preferredPaymentMethod={user.paymentMethod} />
}
