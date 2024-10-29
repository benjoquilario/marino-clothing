import { sizes } from "@/db/schema"
import { createInsertSchema } from "drizzle-zod"
import * as z from "zod"

export const sizeItemSchema = createInsertSchema(sizes, {
  name: z.string().min(1, "Name is required"),
  value: z.string().min(1, "Value is required"),
  inStock: z.coerce.number().min(0, "Stock must be at least 0"),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export type InsertSizeItem = z.infer<typeof sizeItemSchema>
