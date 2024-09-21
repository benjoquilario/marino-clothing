"use client"

import { Button } from "@/components/ui/button"
import { createOrder } from "@/server/order"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { useState } from "react"

export default function PlaceOrderForm() {
  const form = useForm()
  const [error, setError] = useState("")

  const submit = async function () {
    const res = await createOrder()

    if (!res.success) {
      setError(res.message as string)

      return
    }
  }

  const { isSubmitting } = form.formState

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="w-full">
        <Button disabled={isSubmitting} type="submit" className="w-full">
          Place Order
        </Button>
        {error ? <div>{error}</div> : null}
      </form>
    </Form>
  )
}
