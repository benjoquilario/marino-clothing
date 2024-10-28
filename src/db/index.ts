import { env } from "@/env.mjs"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as auth from "./schema/auth"
import * as cart from "./schema/cart"
import * as color from "./schema/color"
import * as order from "./schema/order"
import * as product from "./schema/product"
import * as size from "./schema/size"

export const schema = {
  ...auth,
  ...product,
  ...cart,
  ...order,
  ...color,
  ...size,
}

const connection = postgres(env.DATABASE_URL)
export const db = drizzle(connection, { schema })
