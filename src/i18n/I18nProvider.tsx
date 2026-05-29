import { createContext, useContext, useState, useCallback, useMemo, useEffect, type ReactNode } from 'react'
import type { I18nConfig, I18nContextValue, Locale, TranslationMessages } from './types'
import { translate, isRTLLocale } from './translate'
import { formatNumber, formatDate, formatRelativeTime } from './formatters'
import { enUS, zhCN, jaJP } from './locales'

const defaultMessages: Record<Locale, TranslationMessages> = {
  'en-US': enUS,
  'zh-CN': zhCN,
  'ja-JP': jaJP
}

const I18nContext = createContext<I18nContextValue | null>(null)

interface I18nProviderProps {
  children: ReactNode
  config: I18nConfig
}

export function I18nProvider({ children, config }: I18nProviderProps) {
  const mergedMessages = useMemo(() => ({
    ...defaultMessages,
    ...config.messages
  }), [config.messages])

  const availableLocales = useMemo(() => Object.keys(mergedMessages), [mergedMessages])

  const [locale, setLocaleState] = useState<Locale>(config.locale)
  const fallbackLocale = config.fallbackLocale || 'en-US'
  const rtlLocales = config.rtlLocales || []

  const isRTL = isRTLLocale(locale, rtlLocales)

  useEffect(() => {
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', locale)
  }, [locale, isRTL])

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const currentMessages = mergedMessages[locale] || {}
      const fallbackMessages = mergedMessages[fallbackLocale] || {}
      return translate(key, currentMessages, fallbackMessages, params)
    },
    [locale, mergedMessages, fallbackLocale]
  )

  const formatNum = useCallback(
    (value: number, options?: Intl.NumberFormatOptions): string => {
      return formatNumber(value, locale, options)
    },
    [locale]
  )

  const formatDateFn = useCallback(
    (value: Date | string | number, options?: Intl.DateTimeFormatOptions): string => {
      return formatDate(value, locale, options)
    },
    [locale]
  )

  const formatRelTime = useCallback(
    (value: Date | string | number): string => {
      return formatRelativeTime(value, locale)
    },
    [locale]
  )

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
  }, [])

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    setLocale,
    t,
    isRTL,
    formatNumber: formatNum,
    formatDate: formatDateFn,
    formatRelativeTime: formatRelTime,
    availableLocales,
    messages: mergedMessages[locale] || {}
  }), [locale, setLocale, t, isRTL, formatNum, formatDateFn, formatRelTime, availableLocales, mergedMessages])

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

export function useTranslation() {
  const { t, locale } = useI18n()
  return { t, locale }
}

export { I18nContext }
