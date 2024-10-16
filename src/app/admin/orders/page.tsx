import Pagination from "@/components/pagination"
import DeleteDialog from "@/components/delete-dialog"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { APP_NAME } from "@/lib/constant"
import { formatCurrency, formatDateTime, formatId } from "@/lib/format"
import { Metadata } from "next"
import Link from "next/link"
import { deleteOrder, getAllOrders } from "@/server/order"

export const metadata: Metadata = {
  title: `Admin Orders - ${APP_NAME}`,
}
export default async function OrdersPage({
  searchParams: { page = "1" },
}: {
  searchParams: { page: string }
}) {
  const orders = await getAllOrders({
    page: Number(page),
  })

  return (
    <div className="space-y-2">
      <h1 className="h2-bold">Orders</h1>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>BUYER</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>PAID</TableHead>
              <TableHead>DELIVERED</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{formatId(order.id)}</TableCell>
                <TableCell>
                  {formatDateTime(order.createdAt).dateTime}
                </TableCell>
                <TableCell>
                  {order.user ? order.user.name : "Deleted user"}
                </TableCell>
                <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt
                    ? formatDateTime(order.paidAt).dateTime
                    : "not paid"}
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.deliveredAt
                    ? formatDateTime(order.deliveredAt).dateTime
                    : "not delivered"}
                </TableCell>
                <TableCell className="flex gap-1">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/order/${order.id}`}>Details</Link>
                  </Button>
                  <DeleteDialog
                    id={order.id}
                    // @ts-expect-error
                    action={deleteOrder}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {orders.totalPages > 1 && (
          <Pagination page={page} totalPages={orders?.totalPages!} />
        )}
      </div>
    </div>
  )
}
