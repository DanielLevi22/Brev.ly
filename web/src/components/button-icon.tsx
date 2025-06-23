import { CopyIcon, ArrowUpRight, Trash } from "@phosphor-icons/react"
import type { ComponentProps } from "react"

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'redirect' | 'delete' | 'copy'
}

export function ButtonIcon({ variant = 'copy', ...props}: ButtonProps) {
  const getIcon = () => {
    switch (variant) {
      case 'redirect':
        return <ArrowUpRight size={16} />
      case 'delete':
        return <Trash size={16} />
      case 'copy':
      default:
        return <CopyIcon size={16} />
    }
  }

  return (
    <button 
      className="flex items-center justify-center p-2 rounded-lg bg-grayscale-200 hover:outline-2 hover:outline-blue-base cursor-pointer shadow-custom "
      {...props}
    >
      {getIcon()}
    </button>
  )
}