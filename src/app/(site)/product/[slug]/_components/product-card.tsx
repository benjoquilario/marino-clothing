import Link from "next/link"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { Product } from "@/types"
import ProductPrice from "./product-price"

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="items-center p-0">
        <Link href={`/product/${product.slug}`}>
          <img
            alt={product.name}
            className="aspect-square rounded object-cover"
            height={200}
            src="https://down-ph.img.susercontent.com/file/ph-11134207-7qul9-limq9a60efwma8.webp"
            width={200}
          />
        </Link>
      </CardHeader>
      <CardContent className="grid gap-4 p-4">
        {/* <div className="grid gap-1.5 text-sm leading-4">
          <p className="text-xs leading-3">{product.brand}</p>
        </div> */}
        <div className="grid gap-1.5 text-sm leading-4">
          <Link href={`/product/${product.slug}`}>
            <h2 className="text-sm font-medium">{product.name}</h2>
          </Link>
        </div>
        <div className="flex-between gap-4">
          {/* <p>{product.rating} stars</p> */}
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className="text-destructive">Out of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard
