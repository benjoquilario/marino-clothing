import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SignUpForm from "./_components/sign-up-form"

const SignUp = () => {
  return (
    <div className="mx-auto w-full max-w-md">
      <Card>
        <CardHeader className="space-y-4">
          Marino Clothing
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Select a method to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default SignUp
