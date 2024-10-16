import { create } from "zustand"

type ProductStore = {
  color: string
  inStock: number
  setColor: (color: string) => void
  setInStock: (inStock: number) => void
}

export const useProductStore = create<ProductStore>((set) => ({
  color: "",
  inStock: 0,
  setColor: (color) => set({ color }),
  setInStock: (inStock) => set({ inStock }),
}))
