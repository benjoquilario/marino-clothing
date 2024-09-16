"use server"

import { db } from "@/db"
import { users } from "@/db/schema/auth"
import {
  AuthUsers,
  RegisterUser,
  userAuthSchema,
  userRegisterSchema,
} from "@/lib/validators/auth"
import { eq } from "drizzle-orm"
import { signOut, signIn } from "@/auth"
import { AuthError } from "next-auth"
import { hashPassword } from "@/lib/auth/session"

export async function login(values: AuthUsers) {
  try {
    const validatedFields = userAuthSchema.safeParse(values)

    if (!validatedFields.success) {
      return {
        error: "Invalid Fields",
      }
    }

    const { email, password } = validatedFields.data

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    return { success: true }
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
        case "CallbackRouteError":
          return {
            success: false,
            error: "Invalid credentials",
            statusCode: 401,
          }
        case "AccessDenied":
          return {
            success: false,
            error:
              "Please verify your email, sign up again to resend verification email",
            statusCode: 401,
          }
        // custom error
        case "OAuthAccountAlreadyLinked" as AuthError["type"]:
          return {
            success: false,
            error: "Login with your Google or Github account",
            statusCode: 401,
          }
        default:
          return {
            success: false,
            error: "Oops. Something went wrong",
            statusCode: 500,
          }
      }
    }

    console.error(err)
    return { success: false, error: "Internal Server Error", statusCode: 500 }
  }
}

export async function register(values: RegisterUser) {
  const validatedFields = userRegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { success: false, error: "Invalid Fields", statusCode: 400 }
  }

  const { name, email, password, confirmPassword } = validatedFields.data

  try {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    if (existingUser)
      return {
        message: "Email already exists",
      }

    if (password !== confirmPassword) {
      return { error: "Passwords don't match" }
    }

    const passwordHash = await hashPassword(password)

    await db.insert(users).values({
      name,
      email,
      password: passwordHash,
    })

    return {
      success: true,
      message: "Success",
    }
  } catch (err) {
    console.error(err)
    return { success: false, error: "Internal Server Error", statusCode: 500 }
  }
}

export async function logout() {
  return await signOut()
}
