import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import styles from './Input.module.css'
import type { InputProps } from './types'

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size = 'md',
      variant = 'default',
      label,
      errorMessage,
      helperText,
      leftAddon,
      rightAddon,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`
    const hasError = variant === 'error' || Boolean(errorMessage)

    return (
      <div className={cn(styles['input-wrapper'], className)}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles['input-container']}>
          {leftAddon && <span className={styles['left-addon']}>{leftAddon}</span>}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              styles.input,
              styles[`input--${size}`],
              {
                [styles['input--error']]: hasError,
                [styles['input--with-left-addon']]: leftAddon,
                [styles['input--with-right-addon']]: rightAddon
              }
            )}
            aria-invalid={hasError}
            aria-describedby={
              errorMessage
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            {...props}
          />
          {rightAddon && <span className={styles['right-addon']}>{rightAddon}</span>}
        </div>
        {errorMessage && (
          <span id={`${inputId}-error`} className={styles['error-text']} role="alert">
            {errorMessage}
          </span>
        )}
        {!errorMessage && helperText && (
          <span id={`${inputId}-helper`} className={styles['helper-text']}>
            {helperText}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'