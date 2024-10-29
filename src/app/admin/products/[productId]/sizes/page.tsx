import SizeForm from "./size-form"

const SizePage = ({
  params: { productId },
}: {
  params: {
    productId: string
  }
}) => {
  return (
    <div>
      <SizeForm productId={productId} />
    </div>
  )
}
export default SizePage
