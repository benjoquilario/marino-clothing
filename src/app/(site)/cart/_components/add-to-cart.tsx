"use client"

import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import { Loader, Minus, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import type { Cart } from "@/db/schema"
import type { CartItem } from "@/lib/validators/cart"
import { addItemToCart, removeItemFromCart } from "@/server/cart"

export default function AddToCart({
  cart,
  item,
}: {
  cart?: Cart
  item: Omit<CartItem, "cartId">
}) {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId)

  return existItem ? (
    <div>
      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const res = await removeItemFromCart(item.productId)
            toast({
              variant: res.success ? "default" : "destructive",
              description: `${res.message}`,
            })
            return
          })
        }}
      >
        {isPending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Minus className="h-4 w-4" />
        )}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const res = await addItemToCart(item)
            toast({
              variant: res.success ? "default" : "destructive",
              description: `${res.message}` ?? "",
            })
            return
          })
        }}
      >
        {isPending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button
      className="w-full"
      type="button"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          const res = await addItemToCart(item)
          if (!res.success) {
            toast({
              variant: "destructive",
              description: `${res.message}` ?? "",
            })
            return
          }

          if (res.success) router.push("/cart")
          toast({
            description: `${item.name} added to the cart`,
            action: (
              <ToastAction
                className="bg-primary"
                onClick={() => router.push("/cart")}
                altText="Go to cart"
              >
                Go to cart
              </ToastAction>
            ),
          })
        })
      }}
    >
      {isPending ? <Loader className="animate-spin" /> : <Plus />}
      Add to cart
    </Button>
  )
}
