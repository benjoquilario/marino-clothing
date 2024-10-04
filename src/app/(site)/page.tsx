// import sampleData from '@/lib/seeder';
import { getLatestProducts } from "@/server/product"
import ProductList from "./product/[slug]/_components/product-lists"
import { auth } from "@/auth"
import StoreFront from "@/components/layout/store-front"
import Perks from "@/components/perks"
import sampleData from "@/lib/seeder"
import Row from "@/components/row/content"

export default async function Home() {
  const latestProducts = await getLatestProducts()

  const session = await auth()

  console.log(session)

  return (
    <div className="w-full">
      {/* <div className="px-8">

      </div> */}
      <StoreFront />
      <div className="px-4 pb-12 pt-12 md:px-8">
        {/* <h2 className="mb-4 text-lg font-semibold">Latest Products</h2> */}
        {/* <ProductList data={latestProducts} /> */}
        <Row rowTite="Latest Products" results={latestProducts} />
      </div>

      <div className="px-4 pb-12 pt-12 md:px-8">
        <Row rowTite="Popular Products" results={latestProducts} />
      </div>

      <div className="relative mt-8 overflow-hidden">
        <h2 className="sr-only mb-4 text-lg font-semibold">Our Perks</h2>
        <Perks />
      </div>
    </div>
  )
}
