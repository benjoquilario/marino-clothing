"use client"

import * as React from "react"

import { StoredFile } from "@/types"
import Image from "next/image"

import { cn, parseData } from "@/lib/utils"

export default function ProductImages({ images }: { images?: StoredFile[] }) {
  const [current, setCurrent] = React.useState(0)

  return (
    <div className="space-y-4">
      <Image
        src={parseData<StoredFile[]>(images)[current].url!}
        alt="hero image"
        width={1000}
        height={1000}
        className="min-h-[300px] object-cover object-center"
      />
      <div className="flex">
        {parseData<StoredFile[]>(images)?.map((image, index) => (
          <div
            key={image.id}
            className={cn(
              "mr-2 cursor-pointer border hover:border-orange-600",
              current === index && "border-orange-500"
            )}
            onClick={() => setCurrent(index)}
          >
            <Image src={image.url} alt={image.name} width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  )
}
