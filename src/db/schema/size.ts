import { pgTable, uuid, text, timestamp, integer } from "drizzle-orm/pg-core"
import { relations, InferSelectModel } from "drizzle-orm"
import { products } from "./product"

export const sizes = pgTable("size", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  value: text("value").notNull(),
  productId: uuid("productId").notNull(),
  inStock: integer("inStock").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

export const sizesRelations = relations(sizes, ({ one }) => ({
  product: one(products, {
    fields: [sizes.productId],
    references: [products.id],
  }),
}))

export type Sizes = InferSelectModel<typeof sizes>
