import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CredentialsSignInForm from "./_components/sign-in-form";

const SignIn = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          Marino Clothing
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Select a method to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CredentialsSignInForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
