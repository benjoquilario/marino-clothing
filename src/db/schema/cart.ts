import {
  uuid,
  text,
  timestamp,
  json,
  uniqueIndex,
  pgTable,
  numeric,
} from "drizzle-orm/pg-core"

import { users } from "./auth"
import { type CartItem } from "@/lib/validators/cart"
import { InferSelectModel } from "drizzle-orm"

export const carts = pgTable("cart", {
  id: uuid("id").notNull().defaultRandom().primaryKey(),
  userId: uuid("userId").references(() => users.id, {
    onDelete: "cascade",
  }),
  sessionCartId: text("sessionCartId").notNull(),
  items: json("items").$type<CartItem[]>().notNull().default([]),
  itemsPrice: numeric("itemsPrice", { precision: 12, scale: 2 }).notNull(),
  shippingPrice: numeric("shippingPrice", {
    precision: 12,
    scale: 2,
  }).notNull(),
  taxPrice: numeric("taxPrice", { precision: 12, scale: 2 }).notNull(),
  totalPrice: numeric("totalPrice", { precision: 12, scale: 2 }).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export type Cart = InferSelectModel<typeof carts>
