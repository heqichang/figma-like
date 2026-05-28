import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'

export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The variant of the button
   * @default 'primary'
   */
  variant?: ButtonVariant
  
  /**
   * The size of the button
   * @default 'md'
   */
  size?: ButtonSize
  
  /**
   * Whether the button is in loading state
   * @default false
   */
  isLoading?: boolean
  
  /**
   * Whether the button takes full width of its container
   * @default false
   */
  isFullWidth?: boolean
  
  /**
   * The content to display before the button text
   */
  leftIcon?: ReactNode
  
  /**
   * The content to display after the button text
   */
  rightIcon?: ReactNode
}