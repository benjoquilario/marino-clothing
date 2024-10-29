import { type Cart } from "@/db/schema"
import { APP_NAME } from "@/lib/constant"
import { getCurrentCart } from "@/server/cart"
import { getProductBySlug } from "@/server/product"
import { notFound } from "next/navigation"
import CartAction from "./_components/cart-action"
import ProductImages from "./_components/product-images"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    return { title: "Product not found" }
  }
  return {
    title: `${product.name} - ${APP_NAME}`,
    description: product.description,
  }
}

const ProductDetails = async ({
  params: { slug },
}: {
  params: { slug: string }
  searchParams: { page: string; color: string; size: string }
}) => {
  const product = await getProductBySlug(slug)

  const currentCart = await getCurrentCart()

  if (!product) notFound()

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="col-span-2">
            <ProductImages images={product.images ?? []} />
          </div>

          <CartAction product={product} currentCart={currentCart as Cart} />
        </div>
      </section>
    </>
  )
}

export default ProductDetails
