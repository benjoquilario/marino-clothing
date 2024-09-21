import Image from "next/image"
import Link from "next/link"
import { APP_NAME } from "@/lib/constant"
// import Menu from "./menu"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { MenuIcon } from "lucide-react"
import UserButton from "../user-button"
import CartButton from "../cart-button"
// import { getAllCategories } from "@/lib/actions/product.actions"
// import Search from "./search"

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          {/* <Drawer direction="left">
            <DrawerTrigger asChild>
              <Button variant="outline">
                <MenuIcon />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Select a category</DrawerTitle>
                <div className="space-y-1">
                  {categories.map((category: { name: string }) => (
                    <Button
                      className="w-full justify-start"
                      variant="ghost"
                      key={category.name}
                      asChild
                    >
                      <DrawerClose asChild>
                        <Link href={`/search?category=${category.name}`}>
                          {category.name}
                        </Link>
                      </DrawerClose>
                    </Button>
                  ))}
                </div>
              </DrawerHeader>
            </DrawerContent>
          </Drawer> */}
          <Link href="/" className="flex-start">
            <Image
              src="/assets/icons/logo.svg"
              width={48}
              height={48}
              alt={`${APP_NAME} logo`}
            />
            {APP_NAME}
          </Link>
        </div>
        <div className="hidden md:block">{/* <Search /> */}</div>
        <div className="flex justify-end gap-3">
          <nav className="hidden w-full max-w-xs gap-1 md:flex">
            <CartButton />
            <UserButton />
          </nav>
        </div>
      </div>
      <div className="block px-5 pb-2 md:hidden">{/* <Search /> */}</div>
    </header>
  )
}

export default Header
