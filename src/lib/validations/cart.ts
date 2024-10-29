import * as z from "zod"
import { formatNumberWithDecimal } from "../utils"

export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  qty: z.number().int().nonnegative("Quantity must be a non-negative number"),
  image: z.string().min(1, "Image is required"),
  price: z
    .number()
    .refine(
      (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(value)),
      "Price must have exactly two decimal places (e.g., 49.99)"
    ),
  color: z.string().min(1, "Color is required"),
  sizes: z.string().min(1, "Size is required"),
})

export type CartItem = z.infer<typeof cartItemSchema>
