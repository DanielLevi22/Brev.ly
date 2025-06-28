import { ComponentProps, ReactNode } from 'react'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary' | 'icon'
  icon?: ReactNode
  children?: ReactNode
}

/**
 * Componente Button flexível que suporta ícones e texto
 * 
 * @example
 * // Botão primário com texto
 * <Button variant="primary">Criar Link</Button>
 * 
 * // Botão com ícone e texto
 * <Button variant="icon" icon={<Download size={16} />}>
 *   Baixar CSV
 * </Button>
 * 
 * // Botão secundário com ícone
 * <Button variant="secondary" icon={<CopyIcon size={16} />}>
 *   Copiar
 * </Button>
 * 
 * // Botão apenas com ícone
 * <Button variant="icon" icon={<Trash size={16} />} />
 */
export function Button({ 
  variant = 'primary', 
  className, 
  children, 
  icon,
  ...props 
}: ButtonProps) {
  const baseClasses = 'rounded-lg font-semibold cursor-pointer outline-none disabled:opacity-50'
  
  const variantClasses = {
    primary: ' shadow-custom bg-blue-base py-4 text-grayscale-100 w-full rounded-lg shadow-custom hover:bg-blue-dark hover:text-white',
    secondary: ' shadow-custom bg-grayscale-200 px-2 w-[70px] h-8 text-grayscale-500 flex items-center justify-center gap-2 hover:shadow-[0_0_0_1px_#2c46b1] text-sm',
    icon: 'flex p-2 items-center bg-grayscale-200 gap-2 text-xs md:text-sm font-medium text-grayscale-500 hover:underline disabled:opacity-50 disabled:cursor-not-allowed'
  }

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${className || ''}`} 
      {...props}
    >
      {icon && icon}
      {children}
    </button>
  )
}