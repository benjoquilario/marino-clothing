import {
  boolean,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  json,
} from "drizzle-orm/pg-core"
import { colors } from "./color"
import { InferSelectModel, relations } from "drizzle-orm"
import { sizes } from "./size"
import { type Colors } from "./color"
import { type Sizes } from "./size"
import { attachments } from "./attachment"

export const products = pgTable(
  "product",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    category: text("category").notNull(),
    description: text("description").notNull(),
    stock: integer("stock").notNull(),
    price: numeric("price", { precision: 12, scale: 2 }).notNull().default("0"),
    rating: numeric("rating", { precision: 3, scale: 2 })
      .notNull()
      .default("0"),
    numReviews: integer("numReviews").notNull().default(0),
    isFeatured: boolean("isFeatured").default(false).notNull(),
    banner: text("banner"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => {
    return {
      productSlugIdx: uniqueIndex("product_slug_idx").on(table.slug),
    }
  }
)

export const productsRelations = relations(products, ({ many }) => ({
  colors: many(colors),
  sizes: many(sizes),
  attachments: many(attachments, {
    relationName: "attachments",
  }),
}))

// PRODUCTS
export type Product = InferSelectModel<typeof products> & {
  colors: Colors[]
  sizes: Sizes[]
}
