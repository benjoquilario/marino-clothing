"use client"

import AddToCart from "@/app/(site)/cart/_components/add-to-cart"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { type Cart, type Product } from "@/db/schema"
import { cn, roundTwo } from "@/lib/utils"
import * as React from "react"
import ProductPrice from "./product-price"

type CartActionProps = {
  product: Product
  currentCart: Cart
}

const CartAction: React.FC<CartActionProps> = ({ product, currentCart }) => {
  const [color, setColor] = React.useState<string>(product.colors[0].name)
  const [size, setSize] = React.useState<string>(product.sizes[0].value)

  return (
    <>
      <div className="col-span-2 flex w-full flex-col gap-8 p-5">
        <div className="flex flex-col gap-6">
          <p className="p-medium-16 bg-grey-500/10 text-grey-500 rounded-full"></p>
          <h1 className="h3-bold">{product.name}</h1>
          <p>
            {product.rating} of {product.numReviews} reviews
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex gap-3">
              <ProductPrice
                value={Number(product.price)}
                className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700"
              />
            </div>
          </div>
        </div>

        <div>
          <p>Description: </p>
          <p>{product.description}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h4>Color: </h4>
            <div className="flex flex-wrap items-center gap-2">
              {product.colors.map((color) => (
                <div
                  key={color.id}
                  className={cn(buttonVariants({ variant: "outline" }))}
                  onClick={() => setColor(color.value)}
                >
                  {color.name}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <h4>Sizes</h4>
            <div className="flex flex-wrap items-center gap-2">
              {product.sizes.map((size) => (
                <div
                  key={size.id}
                  className={cn(buttonVariants({ variant: "outline" }))}
                  onClick={() => setSize(size.value)}
                >
                  {size.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Card>
          <CardContent className="p-4">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>
                <ProductPrice value={Number(product.price)} />
              </div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              {product.stock > 0 ? (
                <Badge variant="outline">In stock</Badge>
              ) : (
                <Badge variant="destructive">Unavailable</Badge>
              )}
            </div>

            {product.stock !== 0 && (
              <div className="flex-center">
                <AddToCart
                  cart={currentCart}
                  item={{
                    productId: product.id,
                    name: product.name,
                    slug: product.slug,
                    price: roundTwo(product.price),
                    qty: 1,
                    image: product.images![0].url,
                    color: color,
                    sizes: size,
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
export default CartAction
