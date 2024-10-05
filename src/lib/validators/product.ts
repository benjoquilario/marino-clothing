import * as z from "zod"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { products } from "@/db/schema"
import { is } from "drizzle-orm"

const colorSchema = z.object({
  isAvailable: z.boolean(),
  color: z.string(),
})

const sizeSchema = z.object({
  isAvailable: z.boolean(),
  size: z.string(),
})

export const updateProductSchema = createSelectSchema(products, {
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  stock: z.coerce.number().min(0, "Stock must be at least 0"),
  size: z.array(sizeSchema).min(1, "Product must have at least one size"),
  color: z.array(colorSchema).min(1, "Product must have at least one color"),
}).omit({
  rating: true,
  numReviews: true,
  createdAt: true,
})

export const insertProductSchema = createSelectSchema(products, {
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  stock: z.coerce.number().min(0, "Stock must be at least 0"),
  color: z.array(colorSchema).min(1, "Product must have at least one color"),
  size: z.array(sizeSchema).min(1, "Product must have at least one size"),
}).omit({
  id: true,
  rating: true,
  numReviews: true,
  createdAt: true,
})

export type InsertProduct = z.infer<typeof insertProductSchema>
export type UpdateProduct = z.infer<typeof updateProductSchema>
export type Color = z.infer<typeof colorSchema>
export type Size = z.infer<typeof sizeSchema>
