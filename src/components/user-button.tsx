import Link from "next/link"
import { headers } from "next/headers"
import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from "@/server/auth"
import { GoPerson } from "react-icons/go"

export default async function UserButton() {
  const headersList = headers()

  const session = await auth()

  if (!session)
    return (
      <Link href="/api/auth/signin">
        <Button>Sign In</Button>
      </Link>
    )

  const isAdmin = session.user.role === "admin"

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button variant="ghost" className="relative px-2 py-0">
              <GoPerson className="h-6 w-6" />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuItem>
            <Link className="w-full" href="/user/profile">
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link className="w-full" href="/user/orders">
              Order History
            </Link>
          </DropdownMenuItem>

          {isAdmin && (
            <DropdownMenuItem>
              <Link className="w-full" href="/admin/overview">
                Admin
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem className="mb-1 p-0">
            <form action={logout} className="w-full">
              <Button
                className="h-4 w-full justify-start px-2 py-4"
                variant="ghost"
              >
                Sign Out
              </Button>
            </form>
          </DropdownMenuItem>
          {/* <ModeToggle /> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
