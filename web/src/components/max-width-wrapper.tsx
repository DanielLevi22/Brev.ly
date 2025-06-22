import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface MaxWidthWrapperProps {
  className?: string
  children: ReactNode
}

export function MaxWidthWrapper ({
  className,
  children,
}: MaxWidthWrapperProps) {
  return (
    <div
      className={cn(
        "h-full w-full mx-auto md:w-[980px]",
        className
      )}
    >
      {children}
    </div>
  )
}