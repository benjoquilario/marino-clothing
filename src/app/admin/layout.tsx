import { auth } from "@/auth"
import Menu from "@/components/header-menu"
import { Input } from "@/components/ui/input"
import { APP_NAME } from "@/lib/constant"
import Image from "next/image"
import Link from "next/link"
import { MainNav } from "./_components/main-nav"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (session?.user.role !== "admin")
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="h2-bold">Access Denied</h1>
          <p className="mt-4">You are not authorized to access this page.</p>
          <Link href="/">Home</Link>
        </div>
      </div>
    )

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
