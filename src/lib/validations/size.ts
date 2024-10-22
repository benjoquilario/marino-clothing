import * as z from "zod"

export const sizeItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  value: z.string().min(1, "Value is required"),
  inStock: z
    .number()
    .int()
    .nonnegative("Quantity must be a non-negative number"),
})

export type SizeItem = z.infer<typeof sizeItemSchema>
