import UploadForm from "./upload-form"

const UploadPhoto = ({
  params: { productId },
}: {
  params: {
    productId: string
  }
}) => {
  return (
    <div>
      <UploadForm productId={productId} />
    </div>
  )
}
export default UploadPhoto
