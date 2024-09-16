"use client"

import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { login } from "@/server/auth"
// import { signInDefaultValues } from '@/lib/constant';
import { useForm } from "react-hook-form"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthUsers, userAuthSchema } from "@/lib/validators/auth"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useState } from "react"

export default function SignInForm() {
  const form = useForm<AuthUsers>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const { setError, formState } = form

  const submit = async (values: AuthUsers) => {
    const res = await login(values)

    if (res.success) window.location.href = "/"
    else {
      if (res.error) setError("password", { message: res.error })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <Input type="hidden" name="callbackUrl" value={callbackUrl} />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={formState.isSubmitting}
                  placeholder="m@example.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  disabled={formState.isSubmitting}
                  // defaultValue={signInDefaultValues.email}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Button className="w-full" variant="default">
            Sign In with credentials
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            // target="_self"
            className="link"
            href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          >
            Sign Up
          </Link>
        </div>
      </form>
    </Form>
  )
}
