import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import styles from './Hello.module.css'
import type { HelloProps } from './types'

export const Hello = forwardRef<HTMLDivElement, HelloProps>(
  ({ className, children, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(styles.hello, styles[`hello--variant-${variant}`], styles[`hello--size-${size}`], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Hello.displayName = 'Hello'
