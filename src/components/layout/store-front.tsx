import React from "react"
import { Button } from "../ui/button"
import Image from "next/image"
import front from "@/assets/front.webp"
import { AnimatedGradientText } from "../ui/animated-gradient-text"
import { cn } from "@/lib/utils"

const StoreFront = () => {
  return (
    <div className="overflow-hidden">
      <div className="min-h-[100vh - 128px] mx-auto flex flex-col px-4 md:flex-row md:px-8">
        <div className="flex flex-col gap-2 pt-16 md:pt-24">
          <AnimatedGradientText>
            <span
              className={cn(
                `animate-gradient !m-0 inline bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
              )}
            >
              70% off
            </span>
          </AnimatedGradientText>
          <h2 className="w-full max-w-[490px] text-6xl font-bold">
            Summer styles are finally here
          </h2>
          <p className="text-lg text-foreground/70">
            Get ready for the summer with our new collection
          </p>
          <div>
            <Button>Start Shopping</Button>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-evenly pt-6">
          <div className="relative">
            <Image
              src={front}
              className="rounded-2xl"
              alt=""
              height={550}
              width={300}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreFront
