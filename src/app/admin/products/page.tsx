import DeleteDialog from "@/components/delete-dialog"
import Pagination from "@/components/pagination"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { deleteProduct, getAllProducts } from "@/server/product"
import { APP_NAME } from "@/lib/constant"
import { formatCurrency, formatId } from "@/lib/format"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: `Admin Products - ${APP_NAME}`,
}

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: {
    page: string
    query: string
    category: string
  }
}) {
  const page = Number(searchParams.page) || 1
  const searchText = searchParams.query || ""
  const category = searchParams.category || ""
  const products = await getAllProducts({
    query: searchText,
    category,
    page,
  })
  return (
    <div className="space-y-2">
      <div className="flex-between">
        <h1 className="h2-bold">Products</h1>
        <Button asChild variant="default">
          <Link href="/admin/products/create">Create Product</Link>
        </Button>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead className="text-right">PRICE</TableHead>
              <TableHead>CATEGORY</TableHead>
              <TableHead>STOCK</TableHead>
              <TableHead>RATING</TableHead>
              <TableHead className="w-[100px]">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.data.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{formatId(product.id)}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(product.price)}
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.rating}</TableCell>
                <TableCell className="flex gap-1">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/products/${product.id}`}>Edit</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/products/${product.id}/colors`}>Add Colors</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/products/${product.id}/sizes`}>Add Sizes</Link>
                  </Button>
                  <DeleteDialog
                    id={product.id}
                    // @ts-ignore
                    action={deleteProduct}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {products?.totalPages! > 1 && (
          <Pagination page={page} totalPages={products?.totalPages!} />
        )}
      </div>
    </div>
  )
}
