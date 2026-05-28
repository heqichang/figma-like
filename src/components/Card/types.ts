import type { HTMLAttributes, ReactNode } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the card has a border
   * @default true
   */
  bordered?: boolean
  
  /**
   * Whether the card has a shadow
   * @default true
   */
  shadow?: boolean
  
  /**
   * The content of the card header
   */
  header?: ReactNode
  
  /**
   * The content of the card footer
   */
  footer?: ReactNode
  
  /**
   * Whether the card content should have padding
   * @default true
   */
  padding?: boolean
}