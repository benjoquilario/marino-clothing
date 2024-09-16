import type { NextAuthConfig } from "next-auth"
import { NextResponse } from "next/server"
import { db } from "./db"
import { users } from "./db/schema/auth"
import { eq } from "drizzle-orm"
import { cookies } from "next/headers"

export const authConfig = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    jwt: async ({ token, user, trigger, session }: any) => {
      if (user) {
        if (user.name === "NO_NAME") {
          token.name = user.email!.split("@")[0]
          await db
            .update(users)
            .set({
              name: token.name,
            })
            .where(eq(users.id, user.id))
        }

        token.role = user.role
        // if (trigger === "signIn" || trigger === "signUp") {
        //   const sessionCartId = cookies().get("sessionCartId")?.value;
        //   if (!sessionCartId) throw new Error("Session Cart Not Found");
        //   const sessionCartExists = await db.query.carts.findFirst({
        //     where: eq(carts.sessionCartId, sessionCartId),
        //   });
        //   if (sessionCartExists && !sessionCartExists.userId) {
        //     const userCartExists = await db.query.carts.findFirst({
        //       where: eq(carts.userId, user.id),
        //     });
        //     if (userCartExists) {
        //       cookies().set("beforeSigninSessionCartId", sessionCartId);
        //       cookies().set("sessionCartId", userCartExists.sessionCartId);
        //     } else {
        //       db.update(carts)
        //         .set({ userId: user.id })
        //         .where(eq(carts.id, sessionCartExists.id));
        //     }
        //   }
        // }
      }

      if (session?.user.name && trigger === "update") {
        token.name = session.user.name
      }

      return token
    },
    session: async ({ session, user, trigger, token }: any) => {
      session.user.id = token.sub
      session.user.role = token.role
      if (trigger === "update") {
        session.user.name = user.name
      }
      return session
    },
    authorized({ request, auth }: any) {
      const protectedPaths = [
        /\/shipping-address/,
        /\/payment-method/,
        /\/place-order/,
        /\/profile/,
        /\/user\/(.*)/,
        /\/order\/(.*)/,
        /\/admin/,
      ]
      const { pathname } = request.nextUrl
      if (!auth && protectedPaths.some((p) => p.test(pathname))) return false
      if (!request.cookies.get("sessionCartId")) {
        const sessionCartId = crypto.randomUUID()
        const newRequestHeaders = new Headers(request.headers)
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        })
        response.cookies.set("sessionCartId", sessionCartId)
        return response
      } else {
        return true
      }
    },
  },
  providers: [],
} satisfies NextAuthConfig
