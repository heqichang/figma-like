import type { Locale } from './types'

export function formatNumber(
  value: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(value)
}

export function formatDate(
  value: Date | string | number,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions
): string {
  const date = value instanceof Date ? value : new Date(value)
  return new Intl.DateTimeFormat(locale, options).format(date)
}

export function formatRelativeTime(
  value: Date | string | number,
  locale: Locale
): string {
  const date = value instanceof Date ? value : new Date(value)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  if (diffSeconds < 60) {
    return rtf.format(-diffSeconds, 'second')
  } else if (diffMinutes < 60) {
    return rtf.format(-diffMinutes, 'minute')
  } else if (diffHours < 24) {
    return rtf.format(-diffHours, 'hour')
  } else if (diffDays < 30) {
    return rtf.format(-diffDays, 'day')
  } else {
    return formatDate(date, locale)
  }
}
