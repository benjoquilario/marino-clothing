"use client"

import { useForm } from "react-hook-form"
import { colorSchema, type InsertColorItem } from "@/lib/validators/color"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createColor } from "@/server/product"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type ColorFormProps = {
  productId: string
}

const ColorForm: React.FC<ColorFormProps> = ({ productId }) => {
  const router = useRouter()
  const form = useForm<InsertColorItem>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      name: "",
      value: "",
      inStock: 0,
      productId: productId,
    },
  })

  const submit = async (values: InsertColorItem) => {
    const res = await createColor({
      ...values,
      productId: productId,
    })

    if (!res.success) {
      console.log(res.message)
    } else {
      router.push(`/admin/products/${productId}/sizes`)
    }
  }

  return (
    <div className="flex flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
          <div className="flex flex-col gap-5 md:flex-row">
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
              <div>Must be hex value color</div>
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Enter Hex Value</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter hex value" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="inStock"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Color Instock</FormLabel>
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
export default ColorForm
