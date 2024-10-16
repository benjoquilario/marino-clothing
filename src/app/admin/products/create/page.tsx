import { getColors } from "@/server/product"
import CreateForm from "../_components/create-form"

const CreateProduct = async () => {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <h1 className="h2-bold">Create Product</h1>
      <CreateForm />
    </div>
  )
}
export default CreateProduct
