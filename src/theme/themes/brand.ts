import type { ThemeDefinition } from '../types'

export const brandTheme: ThemeDefinition = {
  id: 'brand',
  name: 'Brand',
  description: 'Brand theme with custom accent colors, extends light theme',
  mode: 'light',
  extends: 'light',
  tokens: [
    { name: 'brand-primary', value: '#8B5CF6' },
    { name: 'brand-primary-hover', value: '#7C3AED' },
    { name: 'brand-primary-active', value: '#6D28D9' },
    { name: 'brand-primary-light', value: '#EDE9FE' },
    { name: 'border-focus', value: '#8B5CF6' },
    { name: 'input-border-focus', value: '#8B5CF6' },
    { name: 'button-bg-primary', value: '#8B5CF6' },
    { name: 'button-bg-primary-hover', value: '#7C3AED' },
    { name: 'button-bg-primary-active', value: '#6D28D9' },
  ]
}
