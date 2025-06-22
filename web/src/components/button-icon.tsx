import { CopyIcon } from "@phosphor-icons/react"
import type { ComponentProps } from "react"

interface ButtonProps extends ComponentProps<'button'> {}

export function ButtonIcon({ ...props}: ButtonProps) {
  return (
    <button 
      className="flex items-center justify-center p-2 rounded-lg bg-grayscale-200 hover:outline-2 hover:outline-blue-base shadow-custom "
      {...props}
    >
      <CopyIcon size={16} />
    </button>
  )
}