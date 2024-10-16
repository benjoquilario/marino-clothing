import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { products } from "./product"

export const attachments = pgTable("attachment", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  productId: uuid("productId"),
  url: text("url").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  key: text("key").notNull(),
})

export const attachmentRelations = relations(attachments, ({ one }) => ({
  product: one(products, {
    fields: [attachments.productId],
    references: [products.id],
    relationName: "attachments",
  }),
}))
