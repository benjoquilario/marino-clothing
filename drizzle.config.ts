import { env } from "./src/env.mjs"
import { cwd } from "node:process"
import { loadEnvConfig } from "@next/env"

import { defineConfig } from "drizzle-kit"
loadEnvConfig(cwd())
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema",
  out: "migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
})
