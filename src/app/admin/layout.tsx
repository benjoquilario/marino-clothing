import Link from "next/link"
import Image from "next/image"
import { MainNav } from "./_components/main-nav"
import Menu from "@/components/header-menu"
import { APP_NAME } from "@/lib/constant"
import { Input } from "@/components/ui/input"
import { auth } from "@/auth"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (session?.user.role !== "admin")
    throw new Error("admin permission required")

  return (
    <>
      <div className="flex flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <Link href="/" className="w-36">
              <Image
                src="/assets/icons/logo.svg"
                width={48}
                height={48}
                alt={`${APP_NAME} logo`}
              />
            </Link>
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <div>
                <Input
                  type="search"
                  placeholder="Search..."
                  className="md:w-[100px] lg:w-[300px]"
                />
              </div>
              <Menu />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
      </div>
    </>
  )
}
