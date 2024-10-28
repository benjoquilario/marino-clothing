"use client"

import { FileUploader } from "@/components/file-uploader"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
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
import { useUploadFile } from "@/hooks/use-media-upload"
import { getErrorMessage } from "@/lib/handle-error"
import {
  type CreateProduct,
  createProductSchema,
} from "@/lib/validations/product"
import { createProduct } from "@/server/product"
import { type StoredFile } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import "@uploadthing/react/styles.css"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useForm } from "react-hook-form"
import slugify from "slugify"
import { toast } from "sonner"

const CreateForm = () => {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const { isUploading, progresses, startUpload } = useUploadFile("attachment", {
    defaultUploadedFiles: [],
  })

  const form = useForm<CreateProduct>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      slug: "",
      category: "",
      price: "0",
      stock: 0,
      description: "",
      images: [],
    },
  })

  // const {
  //   startUpload,
  //   attachments,
  //   isUploading,
  //   uploadProgress,
  //   removeAttachment,
  //   reset,
  // } = useMediaUpload()

  const submit = async (values: CreateProduct) => {
    setLoading(true)

    toast.promise(
      startUpload(values.images ?? []).then((data) => {
        if (data) {
          const uploadedFiles = data.map((file) => {
            return {
              id: file.key,
              name: file.name,
              url: file.url,
            }
          })

          return createProduct({
            ...values,
            images: JSON.stringify(uploadedFiles) as unknown as StoredFile[],
          })
        }
      }),
      {
        loading: "Adding product...",
        success: () => {
          form.reset()
          setLoading(false)
          router.push(`/admin/products/colors`)
          return "Product added successfully"
        },
        error: (err) => {
          setLoading(false)
          return getErrorMessage(err)
        },
      }
    )

    // if (!res.success) {
    //   console.log(res.message)
    // } else {
    //   router.push(`/admin/products`)
    // }
  }

  const isFeatured = form.watch("isFeatured")

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
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
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter product stock"
                    onChange={(e) => form.setValue("stock", 20)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Images</FormLabel>
                <Card>
                  <CardContent className="mt-2 min-h-48 space-y-2">
                    <div className="flex-start space-x-2">
                      <FormControl>
                        <FileUploader
                          value={field.value ?? []}
                          onValueChange={field.onChange}
                          maxFiles={4}
                          maxSize={4 * 1024 * 1024}
                          // progresses={progresses}
                          disabled={isUploading}
                        />
                      </FormControl>
                    </div>
                  </CardContent>
                </Card>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* <UploadAttachment onFileSelected={startUpload} disabled={isUploading} /> */}
        <div>
          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <Button
            onClick={() =>
              void form.trigger([
                "name",
                "slug",
                "category",
                "price",
                "stock",
                "description",
              ])
            }
            disabled={loading}
            size="lg"
            className="button col-span-2 w-full"
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateForm
