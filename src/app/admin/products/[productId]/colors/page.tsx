import { getColorsByProductId } from "@/server/product"
import ColorForm from "./color-form"

const Colors = async ({
  params: { productId },
}: {
  params: {
    productId: string
  }
}) => {
  console.log(productId)

  return (
    <div>
      <ColorForm productId={productId} />
    </div>
  )
}
export default Colors
