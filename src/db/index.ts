import { env } from "@/env.mjs"
import { Pool } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-serverless"
import * as auth from "./schema/auth"
import * as product from "./schema/product"
import * as cart from "./schema/cart"

export const schema = { ...auth, ...product, ...cart }

const connection = new Pool({
  connectionString: env.DATABASE_URL,
})

export const db = drizzle(connection, { schema })
