import type { Token, TokenGroup } from './types'

const buttonTokens: Token[] = [
  { name: 'button-bg-primary', type: 'color', level: 'component', value: '{brand-primary}', group: 'button', description: 'Primary button background' },
  { name: 'button-bg-primary-hover', type: 'color', level: 'component', value: '{brand-primary-hover}', group: 'button', description: 'Primary button hover background' },
  { name: 'button-bg-primary-active', type: 'color', level: 'component', value: '{brand-primary-active}', group: 'button', description: 'Primary button active background' },
  { name: 'button-bg-secondary', type: 'color', level: 'component', value: '{bg-tertiary}', group: 'button', description: 'Secondary button background' },
  { name: 'button-bg-secondary-hover', type: 'color', level: 'component', value: '{gray-200}', group: 'button', description: 'Secondary button hover background' },
  { name: 'button-text-primary', type: 'color', level: 'component', value: '{text-inverse}', group: 'button', description: 'Primary button text color' },
  { name: 'button-text-secondary', type: 'color', level: 'component', value: '{text-primary}', group: 'button', description: 'Secondary button text color' },
  { name: 'button-padding-x-sm', type: 'spacing', level: 'component', value: '{spacing-3}', group: 'button', description: 'Small button horizontal padding' },
  { name: 'button-padding-x-md', type: 'spacing', level: 'component', value: '{spacing-4}', group: 'button', description: 'Medium button horizontal padding' },
  { name: 'button-padding-x-lg', type: 'spacing', level: 'component', value: '{spacing-6}', group: 'button', description: 'Large button horizontal padding' },
  { name: 'button-padding-y-sm', type: 'spacing', level: 'component', value: '{spacing-1}', group: 'button', description: 'Small button vertical padding' },
  { name: 'button-padding-y-md', type: 'spacing', level: 'component', value: '{spacing-2}', group: 'button', description: 'Medium button vertical padding' },
  { name: 'button-padding-y-lg', type: 'spacing', level: 'component', value: '{spacing-3}', group: 'button', description: 'Large button vertical padding' },
  { name: 'button-radius', type: 'radius', level: 'component', value: '{corner-md}', group: 'button', description: 'Button border radius' },
  { name: 'button-font-size-sm', type: 'font', level: 'component', value: '{text-sm}', group: 'button', description: 'Small button font size' },
  { name: 'button-font-size-md', type: 'font', level: 'component', value: '{text-base}', group: 'button', description: 'Medium button font size' },
  { name: 'button-font-size-lg', type: 'font', level: 'component', value: '{text-lg}', group: 'button', description: 'Large button font size' }
]

const inputTokens: Token[] = [
  { name: 'input-bg', type: 'color', level: 'component', value: '{bg-primary}', group: 'input', description: 'Input background' },
  { name: 'input-bg-disabled', type: 'color', level: 'component', value: '{bg-secondary}', group: 'input', description: 'Disabled input background' },
  { name: 'input-border', type: 'color', level: 'component', value: '{border-default}', group: 'input', description: 'Input border color' },
  { name: 'input-border-hover', type: 'color', level: 'component', value: '{border-hover}', group: 'input', description: 'Input hover border color' },
  { name: 'input-border-focus', type: 'color', level: 'component', value: '{border-focus}', group: 'input', description: 'Input focus border color' },
  { name: 'input-border-error', type: 'color', level: 'component', value: '{state-error}', group: 'input', description: 'Input error border color' },
  { name: 'input-text', type: 'color', level: 'component', value: '{text-primary}', group: 'input', description: 'Input text color' },
  { name: 'input-text-placeholder', type: 'color', level: 'component', value: '{text-tertiary}', group: 'input', description: 'Input placeholder color' },
  { name: 'input-padding-x', type: 'spacing', level: 'component', value: '{spacing-3}', group: 'input', description: 'Input horizontal padding' },
  { name: 'input-padding-y', type: 'spacing', level: 'component', value: '{spacing-2}', group: 'input', description: 'Input vertical padding' },
  { name: 'input-radius', type: 'radius', level: 'component', value: '{corner-md}', group: 'input', description: 'Input border radius' },
  { name: 'input-font-size', type: 'font', level: 'component', value: '{text-base}', group: 'input', description: 'Input font size' },
  { name: 'input-shadow-focus', type: 'shadow', level: 'component', value: '{elevation-sm}', group: 'input', description: 'Input focus shadow' }
]

const cardTokens: Token[] = [
  { name: 'card-bg', type: 'color', level: 'component', value: '{bg-primary}', group: 'card', description: 'Card background' },
  { name: 'card-border', type: 'color', level: 'component', value: '{border-default}', group: 'card', description: 'Card border color' },
  { name: 'card-padding', type: 'spacing', level: 'component', value: '{padding-lg}', group: 'card', description: 'Card padding' },
  { name: 'card-radius', type: 'radius', level: 'component', value: '{corner-lg}', group: 'card', description: 'Card border radius' },
  { name: 'card-shadow', type: 'shadow', level: 'component', value: '{elevation-sm}', group: 'card', description: 'Card shadow' }
]

export const componentTokenGroups: TokenGroup[] = [
  { name: 'Button', tokens: buttonTokens, order: 1 },
  { name: 'Input', tokens: inputTokens, order: 2 },
  { name: 'Card', tokens: cardTokens, order: 3 }
]

export const allComponentTokens = componentTokenGroups.flatMap(g => g.tokens)