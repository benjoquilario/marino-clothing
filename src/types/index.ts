import { products } from "@/db/schema/product"
import { InferSelectModel } from "drizzle-orm"

// PRODUCTS
export type Product = InferSelectModel<typeof products>
// export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
