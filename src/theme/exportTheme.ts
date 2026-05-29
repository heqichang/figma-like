import type { ThemeDefinition, ResolvedTheme, ThemeExportOptions } from './types'
import { resolveThemeTokens, tokensToCSSVariables } from './createTheme'

export function exportThemeCSS(
  theme: ResolvedTheme,
  options?: ThemeExportOptions
): string {
  const scope = options?.scope || ':root'
  const selector = scope === ':root'
    ? ':root'
    : `[data-theme="${theme.id}"]`

  let css = `${selector} {\n`
  const entries = Object.entries(theme.cssVariables)
  for (const [key, value] of entries) {
    css += `  ${key}: ${value};\n`
  }
  css += '}\n'
  return css
}

export function exportThemeSCSS(
  theme: ResolvedTheme,
  _options?: ThemeExportOptions
): string {
  let scss = `// Theme: ${theme.name} (${theme.id})\n`
  scss += `// Mode: ${theme.mode}\n\n`

  const entries = Object.entries(theme.cssVariables)
  for (const [key, value] of entries) {
    const varName = key.replace(/^--/, '$')
    scss += `${varName}: ${value};\n`
  }
  return scss
}

export function exportThemeJSON(
  theme: ResolvedTheme,
  _options?: ThemeExportOptions
): string {
  const output = {
    id: theme.id,
    name: theme.name,
    mode: theme.mode,
    tokens: theme.tokens.reduce<Record<string, string | number>>((acc, t) => {
      acc[t.name] = t.value
      return acc
    }, {})
  }
  return JSON.stringify(output, null, 2)
}

export function exportTheme(
  theme: ResolvedTheme,
  options: ThemeExportOptions
): string {
  switch (options.format) {
    case 'css':
      return exportThemeCSS(theme, options)
    case 'scss':
      return exportThemeSCSS(theme, options)
    case 'json':
      return exportThemeJSON(theme, options)
    default:
      throw new Error(`Unsupported export format: ${options.format}`)
  }
}

export function resolveTheme(
  themeDef: ThemeDefinition,
  themeRegistry: Map<string, ThemeDefinition>
): ResolvedTheme {
  const tokens = resolveThemeTokens(themeDef, themeRegistry)
  const cssVariables = tokensToCSSVariables(tokens)

  return {
    id: themeDef.id,
    name: themeDef.name,
    mode: themeDef.mode,
    cssVariables,
    tokens
  }
}
