import type { Locale, TranslationMessages, TranslationValue } from './types'

export function getNestedValue(obj: TranslationMessages, path: string): TranslationValue | TranslationMessages | undefined {
  const keys = path.split('.')
  let current: TranslationMessages | TranslationValue = obj

  for (const key of keys) {
    if (typeof current === 'object' && current !== null && typeof current !== 'function' && key in current) {
      current = (current as TranslationMessages)[key]
    } else {
      return undefined
    }
  }

  return current
}

export function interpolate(
  value: string,
  params: Record<string, string | number>
): string {
  return value.replace(/\{(\w+)\}/g, (match, key) => {
    return params[key] !== undefined ? String(params[key]) : match
  })
}

export function translate(
  key: string,
  messages: TranslationMessages,
  fallbackMessages?: TranslationMessages,
  params?: Record<string, string | number>
): string {
  let value = getNestedValue(messages, key)

  if (value === undefined && fallbackMessages) {
    value = getNestedValue(fallbackMessages, key)
  }

  if (value === undefined) {
    return key
  }

  if (typeof value === 'function') {
    return value(params || {})
  }

  if (params && typeof value === 'string') {
    return interpolate(value, params)
  }

  return String(value)
}

export function isRTLLocale(locale: Locale, rtlLocales: Locale[] = []): boolean {
  const lang = locale.split('-')[0]
  const defaultRTL = ['ar', 'he', 'fa', 'ur']
  return rtlLocales.includes(locale) || defaultRTL.includes(lang)
}
