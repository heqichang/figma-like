import type { ThemeDefinition, ThemeTokenOverride } from './types'

export function createTheme(
  definition: Omit<ThemeDefinition, 'id'> & { id?: string }
): ThemeDefinition {
  return {
    id: definition.id || definition.name.toLowerCase().replace(/\s+/g, '-'),
    name: definition.name,
    description: definition.description,
    mode: definition.mode,
    extends: definition.extends,
    tokens: definition.tokens
  }
}

export function mergeTokens(
  baseTokens: ThemeTokenOverride[],
  overrideTokens: ThemeTokenOverride[]
): ThemeTokenOverride[] {
  const tokenMap = new Map<string, ThemeTokenOverride>()

  for (const token of baseTokens) {
    tokenMap.set(token.name, token)
  }

  for (const token of overrideTokens) {
    tokenMap.set(token.name, token)
  }

  return Array.from(tokenMap.values())
}

export function resolveThemeTokens(
  theme: ThemeDefinition,
  themeRegistry: Map<string, ThemeDefinition>,
  visited: Set<string> = new Set()
): ThemeTokenOverride[] {
  if (visited.has(theme.id)) {
    console.warn(`Circular theme inheritance detected: ${theme.id}`)
    return theme.tokens
  }
  visited.add(theme.id)

  let baseTokens: ThemeTokenOverride[] = []

  if (theme.extends) {
    const parentTheme = themeRegistry.get(theme.extends)
    if (parentTheme) {
      baseTokens = resolveThemeTokens(parentTheme, themeRegistry, visited)
    } else {
      console.warn(`Parent theme "${theme.extends}" not found for theme "${theme.id}"`)
    }
  }

  return mergeTokens(baseTokens, theme.tokens)
}

export function tokensToCSSVariables(tokens: ThemeTokenOverride[]): Record<string, string> {
  const vars: Record<string, string> = {}
  for (const token of tokens) {
    vars[`--${token.name}`] = String(token.value)
  }
  return vars
}
