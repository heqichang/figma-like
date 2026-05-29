import { createContext, useContext, useState, useCallback, useMemo, useEffect, type ReactNode } from 'react'
import type { ThemeDefinition, ResolvedTheme, ThemeContextValue } from './types'
import { lightTheme } from './themes/light'
import { darkTheme } from './themes/dark'
import { brandTheme } from './themes/brand'
import { resolveTheme } from './exportTheme'

const ThemeContext = createContext<ThemeContextValue | null>(null)

function applyThemeToDOM(resolvedTheme: ResolvedTheme) {
  const root = document.documentElement
  root.setAttribute('data-theme', resolvedTheme.id)
  root.setAttribute('data-mode', resolvedTheme.mode)

  for (const [key, value] of Object.entries(resolvedTheme.cssVariables)) {
    root.style.setProperty(key, value)
  }
}

function buildThemeRegistry(
  customThemes?: ThemeDefinition[]
): Map<string, ThemeDefinition> {
  const registry = new Map<string, ThemeDefinition>()
  registry.set(lightTheme.id, lightTheme)
  registry.set(darkTheme.id, darkTheme)
  registry.set(brandTheme.id, brandTheme)

  if (customThemes) {
    for (const theme of customThemes) {
      registry.set(theme.id, theme)
    }
  }

  return registry
}

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: string
  customThemes?: ThemeDefinition[]
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  customThemes
}: ThemeProviderProps) {
  const registry = useMemo(() => buildThemeRegistry(customThemes), [customThemes])
  const availableThemes = useMemo(() => Array.from(registry.values()), [registry])

  const [themeId, setThemeId] = useState(defaultTheme)

  const resolvedTheme = useMemo(() => {
    const themeDef = registry.get(themeId)
    if (!themeDef) {
      console.warn(`Theme "${themeId}" not found, falling back to light theme`)
      return resolveTheme(lightTheme, registry)
    }
    return resolveTheme(themeDef, registry)
  }, [themeId, registry])

  useEffect(() => {
    applyThemeToDOM(resolvedTheme)
  }, [resolvedTheme])

  const setTheme = useCallback((id: string) => {
    if (!registry.has(id)) {
      console.warn(`Theme "${id}" not found`)
      return
    }
    setThemeId(id)
  }, [registry])

  const value = useMemo<ThemeContextValue>(() => ({
    theme: resolvedTheme,
    themeId,
    setTheme,
    themes: registry,
    availableThemes
  }), [resolvedTheme, themeId, setTheme, registry, availableThemes])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export { ThemeContext }
