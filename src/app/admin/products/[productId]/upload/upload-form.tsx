"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import {
  attachmentSchema,
  InsertAttachmentItem,
} from "@/lib/validators/attachment"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { useMediaUpload } from "@/hooks/use-media-upload"
import { useDropzone } from "@uploadthing/react"

type UploadFormProps = {
  productId: string
}
const UploadForm: React.FC<UploadFormProps> = ({ productId }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {
    startUpload,
    attachments,
    isUploading,
    uploadProgress,
    removeAttachment,
    reset,
  } = useMediaUpload()

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: startUpload,
  })

  const form = useForm<InsertAttachmentItem>({
    resolver: zodResolver(attachmentSchema),
  })

  const submit = async function (values: InsertAttachmentItem) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <div {...getRootProps()}>
          {/* <Button type="button" onClick={() => fileInputRef.current?.click()}>
            Upload
          </Button> */}
          <input {...getInputProps()} />
          <div className="flex h-96 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </Form>
  )
}

type UploadAttachmentProps = {
  onFileSelected: (files: File[]) => void
  disabled: boolean
}

const UploadAttachment: React.FC<UploadAttachmentProps> = ({
  onFileSelected,
  disabled,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <Button type="button" onClick={() => fileInputRef.current?.click()}>
        Upload
      </Button>
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        className="sr-only"
        onChange={(e) => {
          const files = Array.from(e.target.files || [])
          if (files.length) {
            onFileSelected(files)
          }
        }}
      />
    </>
  )
}

export default UploadForm
