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
import { GrAppsRounded } from "react-icons/gr"
import { IoCallSharp, IoSearch } from "react-icons/io5"
import { CiSearch } from "react-icons/ci"

const Header = () => {
  return (
    <header className="w-full">
      <div className="bg-black">
        <div className="mx-auto flex max-w-[80rem] flex-col items-center justify-between px-4 py-1 md:flex-row md:px-8 md:py-2.5">
          <p className="mr-0 text-sm text-white/70 md:mr-8">
            25% discount on first purchase
          </p>
          <ul className="flex flex-wrap justify-center text-xs text-white/70 md:ml-auto">
            {["Careers", "Help", "Buyer Protection"].map((i) => (
              <li
                key={i}
                className="mx-1 pb-px md:mr-2.5 lg:[&:nth-of-type(3)]:mr-10 lg:[&:nth-of-type(5)]:mr-10"
              >
                <Link
                  href="/about"
                  className="flex items-center transition-colors hover:text-white"
                >
                  <span>{i}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-1 justify-end">
            <Link className="text-sm text-white/90 hover:text-white" href="/">
              Create an Account
            </Link>
            <span className="ml-4 h-6 w-1 border-r border-gray-400"></span>
            <Link
              className="ml-4 text-sm text-white/90 hover:text-white"
              href="/"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-full max-w-[80rem] items-center px-4 py-4 md:px-8">
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
          <Link href="/" className="flex-start flex-col">
            {/* <Image src={logo} fill alt={`${APP_NAME} logo`} /> */}
            <div className="border-b border-black text-xl font-extrabold tracking-[0.5em]">
              MARINO
            </div>
            <span className="text-[15px] font-semibold uppercase tracking-widest">
              clothing co.
            </span>
          </Link>
        </div>
        <div className="ml-6 hidden md:block">
          <nav className="h-full">
            <ul className="flex h-full space-x-4">
              <li>Men</li>
              <li>Women</li>
              <li>Company</li>
              <li>Stores</li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-1 justify-end">
          <nav className="hidden w-full max-w-xs justify-end gap-1 md:flex">
            <div>
              <Button className="px-2 py-0" variant="ghost">
                <IoSearch className="h-6 w-6" />
              </Button>
            </div>
            <UserButton />
            <CartButton />
          </nav>
        </div>
      </div>
      <div className="block px-5 pb-2 md:hidden">{/* <Search /> */}</div>
    </header>
  )
}

export default Header
