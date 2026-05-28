import type { HTMLAttributes } from 'react'

export interface HelloProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The variant of the Hello
   * @default 'default'
   */
  variant?: 'default' | 'primary'
  
  /**
   * The size of the Hello
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
}
