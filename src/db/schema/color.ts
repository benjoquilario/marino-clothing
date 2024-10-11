import { pgTable, uuid, text, timestamp, integer } from "drizzle-orm/pg-core"
import { relations, InferSelectModel } from "drizzle-orm"
import { products } from "./product"

export const colors = pgTable("color", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  value: text("value").notNull(),
  productId: uuid("productId").notNull(),
  inStock: integer("inStock").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

export const colorsRelations = relations(colors, ({ one }) => ({
  product: one(products, {
    fields: [colors.productId],
    references: [products.id],
  }),
}))

export type Colors = InferSelectModel<typeof colors>
