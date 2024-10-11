import { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  getColors,
  getColorsByProductId,
  getProductById,
} from "@/server/product"
import UpdateForm from "../_components/update-form"
import { APP_NAME } from "@/lib/constant"
import { type Product } from "@/db/schema"
import { type Colors } from "@/db/schema/color"

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
  const product = (await getProductById(productId)) as Product
  const colors = await getColorsByProductId(productId)

  if (!product) notFound()

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <h1 className="h2-bold">Update Product</h1>
      <UpdateForm
        productId={productId}
        colors={colors as Colors[]}
        product={product}
      />
    </div>
  )
}
