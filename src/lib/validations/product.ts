import { products } from "@/db/schema"
import { colors } from "@/db/schema/color"
import { sizes } from "@/db/schema/size"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import * as z from "zod"

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

export const createProductSchema = z.object({
  stock: z.coerce.number().min(0, "Stock must be at least 0"),
  description: z.string().min(1, "Description is required"),
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Must be a valid price",
  }),
  isFeatured: z.boolean().default(false),
  slug: z.string().min(1, "Slug is required"),
  images: z
    .custom<File[] | undefined | null>()
    .optional()
    .nullable()
    .default(null),
})

export type CreateProduct = z.infer<typeof createProductSchema>
export type InsertProduct = z.infer<typeof insertProductSchema>
export type UpdateProduct = z.infer<typeof updateProductSchema>
