import type { Token, TokenGroup } from './types'

const aliasColors: Token[] = [
  { name: 'bg-primary', type: 'color', level: 'alias', value: '{white}', group: 'background', description: 'Primary background color' },
  { name: 'bg-secondary', type: 'color', level: 'alias', value: '{gray-50}', group: 'background', description: 'Secondary background color' },
  { name: 'bg-tertiary', type: 'color', level: 'alias', value: '{gray-100}', group: 'background', description: 'Tertiary background color' },
  { name: 'text-primary', type: 'color', level: 'alias', value: '{gray-900}', group: 'text', description: 'Primary text color' },
  { name: 'text-secondary', type: 'color', level: 'alias', value: '{gray-600}', group: 'text', description: 'Secondary text color' },
  { name: 'text-tertiary', type: 'color', level: 'alias', value: '{gray-400}', group: 'text', description: 'Tertiary text color' },
  { name: 'text-inverse', type: 'color', level: 'alias', value: '{white}', group: 'text', description: 'Inverse text color' },
  { name: 'brand-primary', type: 'color', level: 'alias', value: '{blue-500}', group: 'brand', description: 'Primary brand color' },
  { name: 'brand-primary-hover', type: 'color', level: 'alias', value: '{blue-600}', group: 'brand', description: 'Hover state of primary brand color' },
  { name: 'brand-primary-active', type: 'color', level: 'alias', value: '{blue-700}', group: 'brand', description: 'Active state of primary brand color' },
  { name: 'brand-primary-light', type: 'color', level: 'alias', value: '{blue-100}', group: 'brand', description: 'Light variant of primary brand color' },
  { name: 'border-default', type: 'color', level: 'alias', value: '{gray-200}', group: 'border', description: 'Default border color' },
  { name: 'border-hover', type: 'color', level: 'alias', value: '{gray-300}', group: 'border', description: 'Hover border color' },
  { name: 'border-focus', type: 'color', level: 'alias', value: '{blue-500}', group: 'border', description: 'Focus border color' },
  { name: 'state-success', type: 'color', level: 'alias', value: '{green-500}', group: 'state', description: 'Success state color' },
  { name: 'state-warning', type: 'color', level: 'alias', value: '{yellow-500}', group: 'state', description: 'Warning state color' },
  { name: 'state-error', type: 'color', level: 'alias', value: '{red-500}', group: 'state', description: 'Error state color' }
]

const aliasSpacing: Token[] = [
  { name: 'padding-xs', type: 'spacing', level: 'alias', value: '{spacing-1}', group: 'padding', description: 'Extra small padding' },
  { name: 'padding-sm', type: 'spacing', level: 'alias', value: '{spacing-2}', group: 'padding', description: 'Small padding' },
  { name: 'padding-md', type: 'spacing', level: 'alias', value: '{spacing-4}', group: 'padding', description: 'Medium padding' },
  { name: 'padding-lg', type: 'spacing', level: 'alias', value: '{spacing-6}', group: 'padding', description: 'Large padding' },
  { name: 'padding-xl', type: 'spacing', level: 'alias', value: '{spacing-8}', group: 'padding', description: 'Extra large padding' },
  { name: 'gap-xs', type: 'spacing', level: 'alias', value: '{spacing-1}', group: 'gap', description: 'Extra small gap' },
  { name: 'gap-sm', type: 'spacing', level: 'alias', value: '{spacing-2}', group: 'gap', description: 'Small gap' },
  { name: 'gap-md', type: 'spacing', level: 'alias', value: '{spacing-3}', group: 'gap', description: 'Medium gap' },
  { name: 'gap-lg', type: 'spacing', level: 'alias', value: '{spacing-4}', group: 'gap', description: 'Large gap' }
]

const aliasRadius: Token[] = [
  { name: 'corner-sm', type: 'radius', level: 'alias', value: '{radius-sm}', group: 'corner', description: 'Small corner radius' },
  { name: 'corner-md', type: 'radius', level: 'alias', value: '{radius-md}', group: 'corner', description: 'Medium corner radius' },
  { name: 'corner-lg', type: 'radius', level: 'alias', value: '{radius-lg}', group: 'corner', description: 'Large corner radius' },
  { name: 'corner-full', type: 'radius', level: 'alias', value: '{radius-full}', group: 'corner', description: 'Full corner radius' }
]

const aliasShadow: Token[] = [
  { name: 'elevation-sm', type: 'shadow', level: 'alias', value: '{shadow-sm}', group: 'elevation', description: 'Small elevation shadow' },
  { name: 'elevation-md', type: 'shadow', level: 'alias', value: '{shadow-md}', group: 'elevation', description: 'Medium elevation shadow' },
  { name: 'elevation-lg', type: 'shadow', level: 'alias', value: '{shadow-lg}', group: 'elevation', description: 'Large elevation shadow' }
]

const aliasFont: Token[] = [
  { name: 'body-font', type: 'font', level: 'alias', value: '{font-sans}', group: 'family', description: 'Body font family' },
  { name: 'heading-font', type: 'font', level: 'alias', value: '{font-sans}', group: 'family', description: 'Heading font family' },
  { name: 'body-text-sm', type: 'font', level: 'alias', value: '{text-sm}', group: 'size', description: 'Small body text' },
  { name: 'body-text', type: 'font', level: 'alias', value: '{text-base}', group: 'size', description: 'Default body text' },
  { name: 'body-text-lg', type: 'font', level: 'alias', value: '{text-lg}', group: 'size', description: 'Large body text' },
  { name: 'heading-sm', type: 'font', level: 'alias', value: '{text-xl}', group: 'size', description: 'Small heading' },
  { name: 'heading-md', type: 'font', level: 'alias', value: '{text-2xl}', group: 'size', description: 'Medium heading' },
  { name: 'heading-lg', type: 'font', level: 'alias', value: '{text-3xl}', group: 'size', description: 'Large heading' },
  { name: 'heading-xl', type: 'font', level: 'alias', value: '{text-4xl}', group: 'size', description: 'Extra large heading' }
]

export const aliasTokenGroups: TokenGroup[] = [
  { name: 'Colors', tokens: aliasColors, order: 1 },
  { name: 'Typography', tokens: aliasFont, order: 2 },
  { name: 'Spacing', tokens: aliasSpacing, order: 3 },
  { name: 'Border Radius', tokens: aliasRadius, order: 4 },
  { name: 'Shadows', tokens: aliasShadow, order: 5 }
]

export const allAliasTokens = aliasTokenGroups.flatMap(g => g.tokens)