import { ComponentProps } from 'react';

// Button types
export interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

// ButtonIcon types
export interface ButtonIconProps extends ComponentProps<'button'> {
  variant?: 'copy' | 'delete' | 'download' | 'qr' | 'edit';
  disabled?: boolean;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

// Input types
export interface InputProps extends Omit<ComponentProps<'input'>, 'className'> {
  label?: string;
  prefix?: string;
  error?: string;
  className?: string;
}

// Layout types
export interface MaxWidthWrapperProps {
  children: React.ReactNode;
  className?: string;
}

// Feedback types
export interface NotFoundMessageProps {
  onGoHome: () => void;
}

export interface ManualRedirectProps {
  url: string;
}

export interface RedirectLoaderProps {
  // Componente simples, sem props específicas
}

// Loading types
export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Skeleton types
export interface SkeletonProps {
  className?: string;
}

export interface LinkSkeletonProps {
  // Componente simples, sem props específicas
}

export interface LinksListSkeletonProps {
  // Componente simples, sem props específicas
}

export interface FormSkeletonProps {
  // Componente simples, sem props específicas
}

export interface HeaderSkeletonProps {
  // Componente simples, sem props específicas
}

// Form types
export interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
}

// Modal types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Toast types
export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

// Tooltip types
export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

// Badge types
export interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

// Card types
export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

// Avatar types
export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  className?: string;
}

// Dropdown types
export interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
}

// Tabs types
export interface TabProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
}

// Accordion types
export interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  children: React.ReactNode;
  collapsible?: boolean;
} 