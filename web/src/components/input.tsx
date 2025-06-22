import { ComponentProps } from 'react'
import { Warning } from "@phosphor-icons/react"

interface InputProps extends Omit<ComponentProps<'input'>, 'className'> {
  label: string
  error?: string
  className?: string
}

export function Input({ label, error, className, ...props }: InputProps) {
  const baseClasses = 'w-full px-3 py-2 border-[2px] rounded-lg outline-none transition-colors text-grayscale-600'
  
  const stateClasses = error 
    ? 'border-danger text-danger bg-red-50' 
    : 'border-grayscale-300 bg-white focus:border-blue-base peer-[&:not(:placeholder-shown)]:focus:border-grayscale-300'

  const labelClasses = error 
    ? 'text-danger' 
    : 'text-grayscale-500 group-focus-within:text-blue-base peer-[&:not(:placeholder-shown)]:text-grayscale-500'

  return (
    <div className={`space-y-2 group ${className || ''}`}>
      <label className={`text-sm font-medium transition-colors ${labelClasses}`}>
        {label}
      </label>
      
      <input
        className={`${baseClasses} ${stateClasses} peer`}
        placeholder=" "
        {...props}
      />
      
      {error && (
        <div className="flex items-center gap-1 text-sm text-grayscale-500">
          <Warning size={16} className="text-danger flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
