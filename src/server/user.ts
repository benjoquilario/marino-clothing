"use server"

import { users } from "@/db/schema"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { auth } from "@/auth"
import {
  type ShippingAddress,
  shippingAddressSchema,
} from "@/lib/validators/address"
import { revalidatePath } from "next/cache"
import { PaymentMethod, paymentMethodSchema } from "@/lib/validators/payment"

export const getUserById = async function (userId: string) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  })
  if (!user) throw new Error("User not found")
  return user
}

export async function updateUserAddress(data: ShippingAddress) {
  try {
    const session = await auth()
    const currentUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, session?.user.id!),
    })
    if (!currentUser) throw new Error("User not found")

    const parsedAddress = shippingAddressSchema.parse(data)

    await db
      .update(users)
      .set({ address: parsedAddress })
      .where(eq(users.id, currentUser.id))
    revalidatePath("/place-order")
    return {
      success: true,
      message: "User updated successfully",
    }
  } catch (error) {
    return { success: false, message: error }
  }
}

export async function updateUserPaymentMethod(data: PaymentMethod) {
  try {
    const session = await auth()

    let userId

    if (session) {
      userId = session.user.id
    }

    const currentUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, userId!),
    })
    if (!currentUser) throw new Error("User not found")
    const parsedPaymentMethod = paymentMethodSchema.parse(data)

    await db
      .update(users)
      .set({ paymentMethod: parsedPaymentMethod.type })
      .where(eq(users.id, currentUser.id))
    // revalidatePath('/place-order')
    return {
      success: true,
      message: "User updated successfully",
    }
  } catch (error) {
    return { success: false, message: error }
  }
}
