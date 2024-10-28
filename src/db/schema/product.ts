import { StoredFile } from "@/types"
import { InferSelectModel, relations } from "drizzle-orm"
import {
  boolean,
  decimal,
  integer,
  json,
  numeric,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core"
import { attachments } from "./attachment"
import { colors, type Colors } from "./color"
import { sizes, type Sizes } from "./size"

export const products = pgTable(
  "product",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    category: text("category").notNull(),
    description: text("description").notNull(),
    stock: integer("stock").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
    rating: numeric("rating", { precision: 3, scale: 2 })
      .notNull()
      .default("0"),
    numReviews: integer("numReviews").notNull().default(0),
    isFeatured: boolean("isFeatured").default(false).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    images: json("images").$type<StoredFile[] | null>().default(null),
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
