import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"
const f = createUploadthing()
import { auth } from "@/auth"

import { db } from "@/db"
import { products } from "@/db/schema"
import { attachments } from "@/db/schema/attachment"
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  attachment: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const isAuth = await auth()
      // If you throw, the user will not be able to upload
      if (!isAuth) throw new UploadThingError("Unauthorized")
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: isAuth.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId }
    }),
} satisfies FileRouter
export type OurFileRouter = typeof ourFileRouter
