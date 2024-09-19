import CartForm from "./_components/cart-form"
import { getCurrentCart } from "@/server/cart"

export const metadata = {
  title: `Shopping Cart - ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

export default async function CartPage() {
  const cart = await getCurrentCart()

  return <CartForm cart={cart} />
}
