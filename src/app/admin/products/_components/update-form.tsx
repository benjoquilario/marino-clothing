"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { type Colors } from "@/db/schema/color"
import { type Product } from "@/db/schema/product"
import {
  type InsertProduct,
  updateProductSchema,
} from "@/lib/validations/product"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import slugify from "slugify"

type UpdateFormProps = {
  productId: string
  product: Product
  colors: Colors[]
}

const UpdateForm: React.FC<UpdateFormProps> = ({
  productId,
  product,
  colors,
}) => {
  const router = useRouter()
  const form = useForm<Product>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: product,
  })

  const submit = async (values: InsertProduct) => {
    if (!productId) {
      router.push(`/admin/products`)
      return
    }
    // const res = await updateProduct({ ...values, id: productId })
    
  }

  const images = form.watch("images")
  const isFeatured = form.watch("isFeatured")

  return (
    <Form {...form}>
      <form
        method="post"
        // onSubmit={form.handleSubmit(submit)}
        className="space-y-8"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="name"
            render={({ field }: { field: any }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }: { field: any }) => (
              <FormItem className="w-full">
                <FormLabel>Slug</FormLabel>

                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter product slug"
                      className="pl-8"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        form.setValue(
                          "slug",
                          slugify(form.getValues("name"), { lower: true })
                        )
                      }}
                    >
                      Generate
                    </button>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="brand"
            render={({ field }: { field: any }) => (
              <FormItem className="w-full">
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product brand" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }: { field: any }) => (
              <FormItem className="w-full">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }: { field: any }) => (
              <FormItem className="w-full">
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter product stock"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem className="w-full">
                <FormLabel>Images</FormLabel>
                <Card>
                  <CardContent className="mt-2 min-h-48 space-y-2">
                    <div className="flex-start space-x-2">
                      {images.map((image: string) => (
                        <Image
                          key={image}
                          src={image}
                          alt="product image"
                          className="h-20 w-20 rounded-sm object-cover object-center"
                          width={100}
                          height={100}
                        />
                      ))}
                      <FormControl>
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res: any) => {
                            form.setValue("images", [...images, res[0].url])
                          }}
                          onUploadError={(error: Error) => {
                            toast({
                              variant: "destructive",
                              description: `ERROR! ${error.message}`,
                            })
                          }}
                        />
                      </FormControl>
                    </div>
                  </CardContent>
                </Card>

                <FormMessage />
              </FormItem>
            )}
          />
        </div> */}
        {/* <div>
          Featured Product
          <Card>
            <CardContent className="mt-2 space-y-2">
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Is Featured?</FormLabel>
                  </FormItem>
                )}
              />
              {isFeatured && banner && (
                <Image
                  src={banner}
                  alt="banner image"
                  className="w-full rounded-sm object-cover object-center"
                  width={1920}
                  height={680}
                />
              )}
              {isFeatured && !banner && (
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    form.setValue("banner", res[0].url)
                  }}
                  onUploadError={(error: Error) => {
                    toast({
                      variant: "destructive",
                      description: `ERROR! ${error.message}`,
                    })
                  }}
                />
              )}
            </CardContent>
          </Card>
        </div> */}
        <div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter product description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="button col-span-2 w-full"
          >
            Update
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default UpdateForm
