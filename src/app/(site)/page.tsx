// import sampleData from '@/lib/seeder';
import { getLatestProducts } from "@/server/product"
import ProductList from "./product/[slug]/_components/product-lists"
import { auth } from "@/auth"
import StoreFront from "@/components/layout/store-front"

export default async function Home() {
  const latestProducts = await getLatestProducts()

  const session = await auth()

  console.log(session)

  return (
    <div className="w-full">
      {/* <div className="px-8">

      </div> */}
      <StoreFront />
      <div className="mt-12 px-4 md:px-8">
        <h2 className="mb-4 text-lg font-semibold">Latest Products</h2>
        <ProductList data={latestProducts} />
      </div>
    </div>
  )
}
