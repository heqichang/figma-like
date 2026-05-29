export type Locale = string

export type TranslationValue = string | number | ((params: Record<string, string | number>) => string)

export interface TranslationMessages {
  [key: string]: TranslationValue | TranslationMessages
}

export interface I18nConfig {
  locale: Locale
  fallbackLocale?: Locale
  messages: Record<Locale, TranslationMessages>
  rtlLocales?: Locale[]
}

export interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string | number>) => string
  isRTL: boolean
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string
  formatDate: (value: Date | string | number, options?: Intl.DateTimeFormatOptions) => string
  formatRelativeTime: (value: Date | string | number) => string
  availableLocales: Locale[]
  messages: TranslationMessages
}
