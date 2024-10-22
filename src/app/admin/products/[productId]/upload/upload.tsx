import { useWatch, type Control, type UseFormSetValue } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Attachment } from "@/types"
import { InsertAttachmentItem } from "@/lib/validators/attachment"

type UploadProps = {
  control: Control<InsertAttachmentItem>
  setValue: UseFormSetValue<InsertAttachmentItem>
  children: React.ReactNode
  disabled?: boolean
  attachment: Attachment[]
}
const Upload: React.FC<UploadProps> = (props) => {
  const { control, setValue, children, disabled, attachment } = props
  const [currentImages, setCurrentImages] = useState<Attachment[]>([])

  return <div>Upload</div>
}
export default Upload
