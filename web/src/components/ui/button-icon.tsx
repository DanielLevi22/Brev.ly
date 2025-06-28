import { CopyIcon, ArrowUpRight, Trash } from "@phosphor-icons/react"
import type { ComponentProps, ReactNode } from "react"

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'redirect' | 'delete' | 'copy'
  children?: ReactNode
}

/**
 * Componente ButtonIcon para botões com ícones específicos
 * 
 * @example
 * // Botão apenas com ícone
 * <ButtonIcon variant="copy" />
 * 
 * // Botão com ícone e texto
 * <ButtonIcon variant="delete">Deletar</ButtonIcon>
 * 
 * // Botão de redirecionamento
 * <ButtonIcon variant="redirect">Abrir</ButtonIcon>
 */
export function ButtonIcon({ variant = 'copy', children, ...props}: ButtonProps) {
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

  const hasText = !!children

  return (
    <button 
      className={`flex items-center justify-center p-2 rounded-lg bg-grayscale-200 hover:outline-2 hover:outline-blue-base cursor-pointer shadow-custom ${
        hasText ? 'gap-2 px-3' : ''
      }`}
      {...props}
    >
      {getIcon()}
      {children}
    </button>
  )
}