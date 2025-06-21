import { ComponentProps, ReactNode } from 'react'
import { CopyIcon } from "@phosphor-icons/react"

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary'
  children: ReactNode
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  const baseClasses = 'rounded-lg font-semibold outline-none shadow-custom disabled:opacity-50'
  
  const variantClasses = {
    primary: 'bg-blue-base py-4 text-grayscale-100 w-full rounded-lg shadow-custom hover:bg-blue-dark hover:text-white',
    secondary: 'bg-grayscale-200 px-2 w-[70px] h-8 text-grayscale-500 flex items-center justify-center gap-2 hover:shadow-[0_0_0_1px_#2c46b1] text-sm'
  }

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${className || ''}`} 
      {...props}
    >
      {variant === 'secondary' && <CopyIcon size={16} />}
      {children}
    </button>
  )
}