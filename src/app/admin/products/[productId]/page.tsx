import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getProductById } from "@/server/product"
import UpdateForm from "../_components/update-form"
import { APP_NAME } from "@/lib/constant"

export const metadata: Metadata = {
  title: `Update product - ${APP_NAME}`,
}

export default async function UpdateProductPage({
  params: { productId },
}: {
  params: {
    productId: string
  }
}) {
  const product = await getProductById(productId)

  if (!product) notFound()

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <h1 className="h2-bold">Update Product</h1>
      <UpdateForm productId={productId} product={product} />
    </div>
  )
}
