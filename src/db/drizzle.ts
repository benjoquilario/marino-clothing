import * as product from './schema/product';
import * as auth from './schema/auth';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';

const schema = { ...product, ...auth };

const db = drizzle(sql, {
  schema,
});

export default db;
