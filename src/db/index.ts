import { env } from "@/env.mjs"
import { Pool } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-serverless"
import * as auth from "./schema/auth"
import * as product from "./schema/product"
import * as cart from "./schema/cart"
import * as order from "./schema/order"
import * as color from "./schema/color"
import * as size from "./schema/size"

export const schema = {
  ...auth,
  ...product,
  ...cart,
  ...order,
  ...color,
  ...size,
}

const connection = new Pool({
  connectionString: env.DATABASE_URL,
})

export const db = drizzle(connection, { schema })
