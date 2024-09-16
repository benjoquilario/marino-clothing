import { env } from "@/env.mjs"
import { Pool } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-serverless"
import * as auth from "./schema/auth"
import * as product from "./schema/product"

export const schema = { ...auth, ...product }

const connection = new Pool({
  connectionString: env.DATABASE_URL,
})

export const db = drizzle(connection, { schema })
