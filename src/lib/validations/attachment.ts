import * as z from "zod"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { attachments } from "@/db/schema"

export const attachmentSchema = createInsertSchema(attachments, {
  productId: z.string().min(1, "Product ID is required"),
  url: z.string().min(1, "URL is required"),
  key: z.string().min(1, "Key is required"),
}).omit({
  id: true,
  createdAt: true,
})

export type InsertAttachmentItem = z.infer<typeof attachmentSchema>
