"use client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { type InsertColorItem } from "@/lib/validations/color"
import { sizeItemSchema, type InsertSizeItem } from "@/lib/validations/size"
import { createSizes } from "@/server/product"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

type SizeFormProps = {
  productId: string
}

const SizeForm: React.FC<SizeFormProps> = ({ productId }) => {
  const router = useRouter()
  const form = useForm<InsertSizeItem>({
    resolver: zodResolver(sizeItemSchema),
    defaultValues: {
      name: "",
      value: "",
      inStock: 0,
      productId: productId,
    },
  })

  const submit = async (values: InsertColorItem) => {
    const res = await createSizes({
      ...values,
      productId: productId,
    })

    if (!res.success) {
      console.log(res.message)
    } else {
      router.push(`/admin/products/${productId}/colors`)
    }
  }

  return (
    <div className="flex flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
          <div className="flex flex-col gap-5 md:flex-row">
            <div>Ex: Small, Extra Small, Large, Extra Large</div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Color name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <div>Ex: S, XS, M, XL, L, XXL </div>
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Enter Sizes</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter hex value" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>Enter how many stock in that color have</div>
            <FormField
              control={form.control}
              name="inStock"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Sizes Instock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Color Instock"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </Form>
    </div>
  )
}
export default SizeForm
