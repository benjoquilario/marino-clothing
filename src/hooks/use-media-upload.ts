import { useUploadThing } from "@/lib/uploadthing"
import * as React from "react"

export type Attachments = {
  file: File
  attachmentId?: string
  isUploading: boolean
  url: string
  key: string
}

export const useMediaUpload = () => {
  const [attachments, setAttachments] = React.useState<Attachments[]>([])
  const [uploadProgress, setUploadProgress] = React.useState<number>()

  const { startUpload, isUploading } = useUploadThing("attachment", {
    onBeforeUploadBegin(files) {
      const renamedFiles = files.map((file) => {
        const extension = file.name.split(".").pop()

        return new File(
          [file],
          `attachment_${crypto.randomUUID()}.${extension}`,
          {
            type: file.type,
          }
        )
      })

      setAttachments((prev) => [
        ...prev,
        ...renamedFiles.map((file) => ({
          file,
          isUploading: true,
          url: "",
          key: "",
        })),
      ])

      return renamedFiles
    },
    onUploadProgress: setUploadProgress,
    onClientUploadComplete(res) {
      setAttachments((prev) =>
        prev.map((attachment) => {
          const uploadResult = res.find((r) => r.name === attachment.file.name)

          if (!uploadResult) return attachment

          return {
            ...attachment,
            attachmentIdId: uploadResult.serverData.attachmentId,
            isUploading: false,
            url: uploadResult.url,
            key: uploadResult.key,
          }
        })
      )
    },

    onUploadError(err) {
      setAttachments((prev) =>
        prev.map((attachment) => {
          return {
            ...attachment,
            isUploading: false,
          }
        })
      )
    },
  })

  const handleStartUpload = (files: File[]) => {
    if (isUploading) return

    if (attachments.length + files.length > 5) {
      alert("You can only upload 5 files at a time")
      return
    }

    startUpload(files)
  }

  function removeAttachment(fileName: string) {
    setAttachments((prev) => prev.filter((a) => a.file.name !== fileName))
  }

  function reset() {
    setAttachments([])
    setUploadProgress(undefined)
  }

  return {
    attachments,
    uploadProgress,
    startUpload: handleStartUpload,
    removeAttachment,
    reset,
    isUploading,
  }
}
