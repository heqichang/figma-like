import type { Token, TokenLevel } from './types'
import { allGlobalTokens, allAliasTokens, allComponentTokens } from './index'

export function resolveTokenValue(token: Token, visited: Set<string> = new Set()): string | number {
  const value = token.value
  if (typeof value === 'number') return value
  
  const referenceMatch = value.match(/^\{([^}]+)\}$/)
  if (referenceMatch) {
    const refName = referenceMatch[1]
    if (visited.has(refName)) {
      console.warn(`Circular reference detected for token: ${token.name}`)
      return value
    }
    visited.add(refName)
    
    const allTokens = [...allGlobalTokens, ...allAliasTokens, ...allComponentTokens]
    const referencedToken = allTokens.find(t => t.name === refName)
    if (referencedToken) {
      return resolveTokenValue(referencedToken, visited)
    }
  }
  return value
}

export function tokenToCSSVariableName(tokenName: string): string {
  return `--${tokenName.replace(/\./g, '-')}`
}

export function tokenToCSSValue(token: Token): string {
  const value = resolveTokenValue(token)
  return String(value)
}

export function getTokensByLevel(level: TokenLevel): Token[] {
  switch (level) {
    case 'global':
      return allGlobalTokens
    case 'alias':
      return allAliasTokens
    case 'component':
      return allComponentTokens
  }
}

export function getAllTokens(): Token[] {
  return [...allGlobalTokens, ...allAliasTokens, ...allComponentTokens]
}