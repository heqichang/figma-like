import type { InputHTMLAttributes, ReactNode } from 'react'

export type InputSize = 'sm' | 'md' | 'lg'

export type InputVariant = 'default' | 'error'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * The size of the input
   * @default 'md'
   */
  size?: InputSize
  
  /**
   * The variant of the input
   * @default 'default'
   */
  variant?: InputVariant
  
  /**
   * The label for the input
   */
  label?: string
  
  /**
   * Error message to display
   */
  errorMessage?: string
  
  /**
   * Helper text to display below the input
   */
  helperText?: string
  
  /**
   * Content to display before the input
   */
  leftAddon?: ReactNode
  
  /**
   * Content to display after the input
   */
  rightAddon?: ReactNode
}