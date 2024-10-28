"use server"

import { desc } from "drizzle-orm"

import { db } from "@/db"
import { colors } from "@/db/schema/color"
import { products } from "@/db/schema/product"
import { colorSchema, InsertColorItem } from "@/lib/validations/color"
import {
  updateProductSchema,
  type CreateProduct,
  type UpdateProduct,
} from "@/lib/validations/product"
import { type StoredFile } from "@/types"
import { and, count, eq, ilike, sql } from "drizzle-orm/sql"
import { revalidatePath } from "next/cache"

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
    with: {
      attachments: true,
    },
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

export async function createProduct(
  data: Omit<CreateProduct, "images"> & {
    images: StoredFile[]
  }
) {
  try {
    const checkProductName = await db.query.products.findFirst({
      columns: {
        id: true,
      },
      where: eq(products.name, data.name),
    })

    if (checkProductName) {
      throw new Error("Product name already taken.")
    }

    await db.insert(products).values({
      ...data,
      images: JSON.stringify(data.images) as unknown as StoredFile[],
    })

    revalidatePath("/admin/products/create")
    return {
      data: null,
      success: true,
      message: "Product created successfully",
    }
  } catch (error) {
    return { success: false, message: error, data: null }
  }
}

export async function updateProduct(
  data: Omit<UpdateProduct, "images"> & {
    images: StoredFile[]
  }
) {
  try {
    const product = updateProductSchema.parse(data)

    const productExists = await db.query.products.findFirst({
      where: eq(products.id, product.id),
    })

    if (!productExists) throw new Error("Product not found")

    await db
      .update(products)
      .set({
        ...product,
        images: JSON.stringify(product.images) as unknown as StoredFile[],
      })
      .where(eq(products.id, product.id))
    revalidatePath("/admin/products")
    return {
      success: true,
      message: "Product updated successfully",
    }
  } catch (error) {
    return { success: false, message: error }
  }
}

export async function getColorsByProductId(productId: string) {
  return await db.query.colors.findMany({
    where: eq(colors.productId, productId),
  })
}

export async function getColors() {
  return await db.query.colors.findMany()
}

export async function createColor(data: InsertColorItem) {
  try {
    const color = colorSchema.parse(data)

    await db.insert(colors).values(color)

    return {
      success: true,
      message: "Product created successfully",
    }
  } catch (error) {
    return { success: false, message: error }
  }
}
