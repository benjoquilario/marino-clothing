import * as z from "zod"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { products } from "@/db/schema"
import { colors } from "@/db/schema/color"
import { sizes } from "@/db/schema/size"

export const selectProductSchema = createInsertSchema(products)

export const colorsSchema = createSelectSchema(colors)
export const sizesSchema = createSelectSchema(sizes)

export const updateProductSchema = createSelectSchema(products, {
  stock: z.coerce.number().min(0, "Stock must be at least 0"),
  images: z
    .custom<File[] | undefined | null>()
    .optional()
    .nullable()
    .default(null),
}).omit({
  rating: true,
  numReviews: true,
  createdAt: true,
})

export const insertProductSchema = createSelectSchema(products, {
  stock: z.coerce.number().min(0, "Stock must be at least 0"),
  images: z
    .custom<File[] | undefined | null>()
    .optional()
    .nullable()
    .default(null),
}).omit({
  id: true,
  rating: true,
  numReviews: true,
  createdAt: true,
})

export type InsertProduct = z.infer<typeof insertProductSchema>
export type UpdateProduct = z.infer<typeof updateProductSchema>
