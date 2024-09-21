import {
  uuid,
  json,
  numeric,
  boolean,
  timestamp,
  text,
  integer,
  pgTable,
  primaryKey,
} from "drizzle-orm/pg-core"
import type { ShippingAddress } from "@/lib/validators/address"
import type { PaymentResult } from "@/lib/validators/payment"
import { users, products } from "./"
import { relations, InferSelectModel } from "drizzle-orm"

export const orders = pgTable("order", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  shippingAddress: json("shippingAddress").$type<ShippingAddress>().notNull(),
  paymentMethod: text("paymentMethod").notNull(),
  paymentResult: json("paymentResult").$type<PaymentResult>(),
  itemsPrice: numeric("itemsPrice", { precision: 12, scale: 2 }).notNull(),
  shippingPrice: numeric("shippingPrice", {
    precision: 12,
    scale: 2,
  }).notNull(),
  taxPrice: numeric("taxPrice", { precision: 12, scale: 2 }).notNull(),
  totalPrice: numeric("totalPrice", { precision: 12, scale: 2 }).notNull(),
  isPaid: boolean("isPaid").notNull().default(false),
  paidAt: timestamp("paidAt"),
  isDelivered: boolean("isDelivered").notNull().default(false),
  deliveredAt: timestamp("deliveredAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export const ordersRelations = relations(orders, ({ one, many }) => ({
  orderItems: many(orderItems),
  user: one(users, { fields: [orders.userId], references: [users.id] }),
}))

export const orderItems = pgTable(
  "orderItems",
  {
    orderId: uuid("orderId")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    productId: uuid("productId")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    qty: integer("qty").notNull(),
    price: numeric("price", { precision: 12, scale: 2 }).notNull(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    image: text("image").notNull(),
  },
  (orderItem) => ({
    compoundKey: primaryKey({
      columns: [orderItem.orderId, orderItem.productId],
    }),
  })
)

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
}))

export type Order = InferSelectModel<typeof orders> & {
  orderItems: OrderItem[]
  user: { name: string | null; email: string }
}
export type OrderItem = InferSelectModel<typeof orderItems>
