import { auth } from "@/auth"
import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"
const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  attachment: f({ image: { maxFileSize: "4MB", maxFileCount: 3 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      const isAuth = await auth()
      if (!isAuth) throw new UploadThingError("Unauthorized")
      return { userId: isAuth.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId }
    }),
} satisfies FileRouter
export type OurFileRouter = typeof ourFileRouter
