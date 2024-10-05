"use server"

import { desc } from "drizzle-orm"

import { eq, count, sql, and, ilike } from "drizzle-orm/sql"
import { db } from "@/db"
import { products } from "@/db/schema/product"
import { revalidatePath } from "next/cache"
import { UpdateProduct, updateProductSchema } from "@/lib/validators/product"

export async function getLatestProducts() {
  const data = await db.query.products.findMany({
    orderBy: [desc(products.createdAt)],
    limit: 4,
  })
  return data
}

export async function getProductBySlug(slug: string) {
  return await db.query.products.findFirst({
    where: eq(products.slug, slug),
  })
}

export async function getProductById(productId: string) {
  return await db.query.products.findFirst({
    where: eq(products.id, productId),
  })
}

const PAGE_SIZE = 10

export async function getAllProducts({
  query,
  limit = PAGE_SIZE,
  page,
  category,
  price,
  rating,
  sort,
}: {
  query: string
  category: string
  limit?: number
  page: number
  price?: string
  rating?: string
  sort?: string
}) {
  const queryFilter =
    query && query !== "all" ? ilike(products.name, `%${query}%`) : undefined
  const categoryFilter =
    category && category !== "all" ? eq(products.category, category) : undefined
  const ratingFilter =
    rating && rating !== "all"
      ? sql`${products.rating} >= ${rating}`
      : undefined
  // 100-200
  const priceFilter =
    price && price !== "all"
      ? sql`${products.price} >= ${price.split("-")[0]} AND ${
          products.price
        } <= ${price.split("-")[1]}`
      : undefined
  const order =
    sort === "lowest"
      ? products.price
      : sort === "highest"
        ? desc(products.price)
        : sort === "rating"
          ? desc(products.rating)
          : desc(products.createdAt)

  const condition = and(queryFilter, categoryFilter, ratingFilter, priceFilter)
  const data = await db
    .select()
    .from(products)
    .where(condition)
    .orderBy(order)
    .offset((page - 1) * limit)
    .limit(limit)

  const dataCount = await db
    .select({ count: count() })
    .from(products)
    .where(condition)

  return {
    data,
    totalPages: Math.ceil(dataCount[0].count / limit),
  }
}

export async function deleteProduct(id: string) {
  try {
    const productExists = await db.query.products.findFirst({
      where: eq(products.id, id),
    })
    if (!productExists) throw new Error("Product not found")
    await db.delete(products).where(eq(products.id, id))
    revalidatePath("/admin/products")
    return {
      success: true,
      message: "Product deleted successfully",
    }
  } catch (error) {
    return { success: false, message: error }
  }
}

export async function updateProduct(data: UpdateProduct) {
  try {
    const product = updateProductSchema.parse(data)

    const productExists = await db.query.products.findFirst({
      where: eq(products.id, product.id),
    })

    if (!productExists) throw new Error("Product not found")

    await db.update(products).set(product).where(eq(products.id, product.id))
    revalidatePath("/admin/products")
    return {
      success: true,
      message: "Product updated successfully",
    }
  } catch (error) {
    return { success: false, message: error }
  }
}
