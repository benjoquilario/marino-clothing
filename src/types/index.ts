import { products } from "@/db/schema/product"
import { InferSelectModel } from "drizzle-orm"

// PRODUCTS
export type Product = InferSelectModel<typeof products>
// export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
export interface Attachment {
  url: string
  productId: string
  id?: string
  key: string
}

export interface StoreFile {
  id: string
  name: string
  url: string
}
