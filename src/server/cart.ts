"use server"

import { cookies } from "next/headers"
import { auth } from "@/auth"
import { db } from "@/db"
import { carts, products } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { CartItem, cartItemSchema } from "@/lib/validators/cart"
import { revalidatePath } from "next/cache"
import { calcPrice } from "@/lib/utils"

export async function getCurrentCart() {
  const sessionCartId = cookies().get("sessionCartId")?.value

  if (!sessionCartId) return undefined

  let userId

  const session = await auth()

  if (session) {
    userId = session.user.id
  }

  const cart = await db.query.carts.findFirst({
    where: userId
      ? eq(carts.userId, userId)
      : eq(carts.sessionCartId, sessionCartId),
  })

  return cart
}

export const addItemToCart = async (data: CartItem) => {
  try {
    const sessionCartId = cookies().get("sessionCartId")?.value

    if (!sessionCartId) throw new Error("Cart Session not found")

    const session = await auth()

    let userId

    if (session) {
      userId = session.user.id as string | undefined
    }

    const cart = await getCurrentCart()

    const parsedCartItem = cartItemSchema.parse(data)

    const product = await db.query.products.findFirst({
      where: eq(products.id, parsedCartItem.productId),
    })

    if (!product) throw new Error("Product not found")

    if (!cart) {
      if (product.stock < 1) throw new Error("Not enough stock")

      await db.insert(carts).values({
        userId: userId,
        items: [parsedCartItem],
        sessionCartId: sessionCartId,
        ...calcPrice([parsedCartItem]),
      })

      revalidatePath(`/product/${product.slug}`)
      return {
        success: true,
        message: "Item added to cart successfully",
      }
    } else {
      const existItem = cart.items.find(
        (x) => x.productId === parsedCartItem.productId
      )

      if (existItem) {
        if (product.stock < existItem.qty + 1)
          throw new Error("Not enough stock")
        cart.items.find((i) => i.productId === parsedCartItem.productId)!.qty =
          existItem.qty + 1
      } else {
        if (product.stock < 1) throw new Error("Not enough stock")
        cart.items.push(parsedCartItem)
      }

      await db
        .update(carts)
        .set({
          items: cart.items,
          ...calcPrice(cart.items),
        })
        .where(and(eq(carts.id, cart.id)))

      revalidatePath(`/product/${product.slug}`)
      return {
        success: true,
        message: `${product.name} ${
          existItem ? "updated in" : "added to"
        } cart successfully`,
      }
    }
  } catch (error) {
    return { success: false, message: error }
  }
}

export const removeItemFromCart = async (productId: string) => {
  try {
    const sessionCartId = cookies().get("sessionCartId")?.value

    if (!sessionCartId) throw new Error("Cart Session not found")

    const product = await db.query.products.findFirst({
      where: eq(products.id, productId),
    })

    if (!product) throw new Error("Product not found")

    const cart = await getCurrentCart()

    if (!cart) throw new Error("Cart not found")

    const exist = cart.items.find((x) => x.productId === productId)

    if (!exist) throw new Error("Item not found")

    if (exist.qty === 1) {
      cart.items = cart.items.filter((x) => x.productId !== exist.productId)
    } else {
      cart.items.find((x) => x.productId === productId)!.qty = exist.qty - 1
    }

    await db
      .update(carts)
      .set({
        items: cart.items,
        ...calcPrice(cart.items),
      })
      .where(eq(carts.id, cart.id))
    revalidatePath(`/product/${product.slug}`)
    return {
      success: true,
      message: `${product.name} ${
        cart.items.find((x) => x.productId === productId)
          ? "updated in"
          : "removed from"
      } cart successfully`,
    }
  } catch (error) {
    return { success: false, message: error }
  }
}
