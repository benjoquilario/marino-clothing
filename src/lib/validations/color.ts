import * as z from "zod"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { colors } from "@/db/schema"

export const colorSchema = createInsertSchema(colors, {
  name: z.string().min(1, "Name is required"),
  value: z.string().min(1, "Value is required"),
  inStock: z.coerce.number().min(0, "Stock must be at least 0"),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export type InsertColorItem = z.infer<typeof colorSchema>
