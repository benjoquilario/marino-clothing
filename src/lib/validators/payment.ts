import * as z from "zod"
import { createInsertSchema } from "drizzle-zod"
import { PAYMENT_METHODS } from "../constant"
import { orders } from "@/db/schema"
import { shippingAddressSchema } from "./address"

export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, "Payment method is required"),
  })
  .refine((data) => PAYMENT_METHODS.includes(data.type), {
    path: ["type"],
    message: "Invalid payment method",
  })

export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string(),
  pricePaid: z.string(),
})

export const insertOrderSchema = createInsertSchema(orders, {
  shippingAddress: shippingAddressSchema,
  paymentResult: z
    .object({
      id: z.string(),
      status: z.string(),
      email_address: z.string(),
      pricePaid: z.string(),
    })
    .optional(),
})

export type PaymentResult = z.infer<typeof paymentResultSchema>
export type PaymentMethod = z.infer<typeof paymentMethodSchema>
