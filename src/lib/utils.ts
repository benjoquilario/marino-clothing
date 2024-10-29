import { clsx, type ClassValue } from "clsx"
import qs from "query-string"
import { twMerge } from "tailwind-merge"
import { CartItem } from "./validations/cart"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNumberWithDecimal = (num: number): string => {
  const [int, decimal] = num.toString().split(".")
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : int //12.1 => 12.10
}

export const roundTwo = (value: number | string) => {
  if (typeof value === "number") {
    return Math.round((value + Number.EPSILON) * 100) / 100 // avoid rounding errors
  } else if (typeof value === "string") {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100
  } else {
    throw new Error("value is not a number nor a string")
  }
}

export const calcPrice = (items: CartItem[]) => {
  const itemsPrice = roundTwo(
      items.reduce((acc, item) => acc + item.price * item.qty, 0)
    ),
    shippingPrice = roundTwo(itemsPrice > 100 ? 0 : 10),
    taxPrice = roundTwo(0.15 * itemsPrice),
    totalPrice = roundTwo(itemsPrice + shippingPrice + taxPrice)
  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  }
}

export const parseData = <T>(data?: T): T => {
  return JSON.parse(data as any) as T
}

export function formUrlQuery({
  params,
  key,
  value,
}: {
  params: string
  key: string
  value: string | null
}) {
  const currentUrl = qs.parse(params)

  currentUrl[key] = value

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export function formatBytes(
  bytes: number,
  decimals = 0,
  sizeType: "accurate" | "normal" = "normal"
) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"]
  if (bytes === 0) return "0 Byte"
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate"
      ? (accurateSizes[i] ?? "Bytest")
      : (sizes[i] ?? "Bytes")
  }`
}
