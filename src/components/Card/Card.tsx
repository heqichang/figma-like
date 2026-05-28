import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import styles from './Card.module.css'
import type { CardProps } from './types'

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      children,
      bordered = true,
      shadow = true,
      header,
      footer,
      padding = true,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          styles.card,
          {
            [styles['card--bordered']]: bordered,
            [styles['card--shadow']]: shadow
          },
          className
        )}
        {...props}
      >
        {header && <div className={styles['card-header']}>{header}</div>}
        <div className={cn(styles['card-body'], { [styles['card-body--no-padding']]: !padding })}>
          {children}
        </div>
        {footer && <div className={styles['card-footer']}>{footer}</div>}
      </div>
    )
  }
)

Card.displayName = 'Card'