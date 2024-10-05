import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { products } from "./product"

export const sizes = pgTable("size", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  value: text("value").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

export const colorsRelations = relations(sizes, ({ one }) => ({
  size: one(products, { fields: [sizes.id], references: [products.id] }),
}))
