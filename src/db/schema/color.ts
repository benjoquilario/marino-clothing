import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { products } from "./product"

export const colors = pgTable("color", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  value: text("value").notNull(),
  isAvailable: boolean("isAvailable").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

export const colorsRelations = relations(colors, ({ one }) => ({
  color: one(products, { fields: [colors.id], references: [products.id] }),
}))
