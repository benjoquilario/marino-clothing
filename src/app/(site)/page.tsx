// import sampleData from '@/lib/seeder';
import { getLatestProducts } from "@/server/product"
import ProductList from "./product/[slug]/_components/product-lists"
import { auth } from "@/auth"

export default async function Home() {
  const latestProducts = await getLatestProducts()

  const session = await auth()

  console.log(session)

  return (
    <div className="space-y-8">
      <h2 className="h2-bold">Latest Products</h2>
      <ProductList data={latestProducts} />
    </div>
  )
}
