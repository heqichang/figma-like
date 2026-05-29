export type ThemeMode = 'light' | 'dark'

export interface ThemeTokenOverride {
  name: string
  value: string | number
}

export interface ThemeDefinition {
  id: string
  name: string
  description?: string
  mode: ThemeMode
  extends?: string
  tokens: ThemeTokenOverride[]
}

export interface ResolvedTheme {
  id: string
  name: string
  mode: ThemeMode
  cssVariables: Record<string, string>
  tokens: ThemeTokenOverride[]
}

export interface ThemeContextValue {
  theme: ResolvedTheme
  themeId: string
  setTheme: (id: string) => void
  themes: Map<string, ThemeDefinition>
  availableThemes: ThemeDefinition[]
}

export interface ThemeExportOptions {
  format: 'css' | 'scss' | 'json'
  includeResolved?: boolean
  scope?: string
}
