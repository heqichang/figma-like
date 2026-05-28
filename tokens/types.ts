export type TokenType = 'color' | 'font' | 'spacing' | 'radius' | 'shadow' | 'duration' | 'breakpoint'

export type TokenLevel = 'global' | 'alias' | 'component'

export interface BaseToken {
  name: string
  type: TokenType
  level: TokenLevel
  value: string | number
  description?: string
  group?: string
}

export interface ColorToken extends BaseToken {
  type: 'color'
  value: string
}

export interface FontToken extends BaseToken {
  type: 'font'
  value: string
}

export interface SpacingToken extends BaseToken {
  type: 'spacing'
  value: string
}

export interface RadiusToken extends BaseToken {
  type: 'radius'
  value: string
}

export interface ShadowToken extends BaseToken {
  type: 'shadow'
  value: string
}

export interface DurationToken extends BaseToken {
  type: 'duration'
  value: string
}

export interface BreakpointToken extends BaseToken {
  type: 'breakpoint'
  value: string
}

export type Token = ColorToken | FontToken | SpacingToken | RadiusToken | ShadowToken | DurationToken | BreakpointToken

export interface TokenGroup {
  name: string
  tokens: Token[]
  order: number
}

export interface TokenCollection {
  global: TokenGroup[]
  alias: TokenGroup[]
  component: TokenGroup[]
}