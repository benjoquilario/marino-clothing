"use client"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  RegisterUser,
  userAuthSchema,
  userRegisterSchema,
} from "@/lib/validators/auth"
import { register } from "@/server/auth"
import { useRouter, useSearchParams } from "next/navigation"

const SignUpForm = () => {
  const router = useRouter()

  const form = useForm<RegisterUser>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  })

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const { setError } = form

  const submit = async (values: RegisterUser) => {
    const res = await register(values)

    if (res.success) router.push("/sign-in")
    else {
      console.log(res.error)
      switch (res.statusCode) {
        case 500:
        default:
          const error = res.error || "Internal Server Error"
          setError("confirmPassword", { message: error })
      }
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
                <Input placeholder="m@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"

                  // defaultValue={signInDefaultValues.email}
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

                  // defaultValue={signInDefaultValues.email}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"

                  // defaultValue={signInDefaultValues.email}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Button type="submit" className="w-full" variant="default">
            Sign up
          </Button>
        </div>

        {/* <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            // target="_self"
            className="link"
            href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          >
            Sign Up
          </Link>
        </div> */}
      </form>
    </Form>
  )
}

export default SignUpForm
