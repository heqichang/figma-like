import type { Token, TokenGroup } from './types'

const colors: Token[] = [
  { name: 'white', type: 'color', level: 'global', value: '#FFFFFF', group: 'neutral', description: 'White color' },
  { name: 'black', type: 'color', level: 'global', value: '#000000', group: 'neutral', description: 'Black color' },
  { name: 'gray-50', type: 'color', level: 'global', value: '#F9FAFB', group: 'neutral', description: 'Lightest gray' },
  { name: 'gray-100', type: 'color', level: 'global', value: '#F3F4F6', group: 'neutral', description: 'Very light gray' },
  { name: 'gray-200', type: 'color', level: 'global', value: '#E5E7EB', group: 'neutral', description: 'Light gray' },
  { name: 'gray-300', type: 'color', level: 'global', value: '#D1D5DB', group: 'neutral', description: 'Medium light gray' },
  { name: 'gray-400', type: 'color', level: 'global', value: '#9CA3AF', group: 'neutral', description: 'Medium gray' },
  { name: 'gray-500', type: 'color', level: 'global', value: '#6B7280', group: 'neutral', description: 'Dark gray' },
  { name: 'gray-600', type: 'color', level: 'global', value: '#4B5563', group: 'neutral', description: 'Darker gray' },
  { name: 'gray-700', type: 'color', level: 'global', value: '#374151', group: 'neutral', description: 'Very dark gray' },
  { name: 'gray-800', type: 'color', level: 'global', value: '#1F2937', group: 'neutral', description: 'Almost black gray' },
  { name: 'gray-900', type: 'color', level: 'global', value: '#111827', group: 'neutral', description: 'Darkest gray' },
  { name: 'blue-50', type: 'color', level: 'global', value: '#EFF6FF', group: 'primary', description: 'Lightest blue' },
  { name: 'blue-100', type: 'color', level: 'global', value: '#DBEAFE', group: 'primary', description: 'Very light blue' },
  { name: 'blue-200', type: 'color', level: 'global', value: '#BFDBFE', group: 'primary', description: 'Light blue' },
  { name: 'blue-300', type: 'color', level: 'global', value: '#93C5FD', group: 'primary', description: 'Medium light blue' },
  { name: 'blue-400', type: 'color', level: 'global', value: '#60A5FA', group: 'primary', description: 'Medium blue' },
  { name: 'blue-500', type: 'color', level: 'global', value: '#3B82F6', group: 'primary', description: 'Primary blue' },
  { name: 'blue-600', type: 'color', level: 'global', value: '#2563EB', group: 'primary', description: 'Dark blue' },
  { name: 'blue-700', type: 'color', level: 'global', value: '#1D4ED8', group: 'primary', description: 'Darker blue' },
  { name: 'blue-800', type: 'color', level: 'global', value: '#1E40AF', group: 'primary', description: 'Very dark blue' },
  { name: 'blue-900', type: 'color', level: 'global', value: '#1E3A8A', group: 'primary', description: 'Darkest blue' },
  { name: 'green-500', type: 'color', level: 'global', value: '#22C55E', group: 'success', description: 'Success green' },
  { name: 'yellow-500', type: 'color', level: 'global', value: '#EAB308', group: 'warning', description: 'Warning yellow' },
  { name: 'red-500', type: 'color', level: 'global', value: '#EF4444', group: 'error', description: 'Error red' }
]

const fonts: Token[] = [
  { name: 'font-sans', type: 'font', level: 'global', value: "'Inter', system-ui, sans-serif", group: 'family', description: 'Sans-serif font family' },
  { name: 'font-mono', type: 'font', level: 'global', value: "'Fira Code', monospace", group: 'family', description: 'Monospace font family' },
  { name: 'text-xs', type: 'font', level: 'global', value: '0.75rem', group: 'size', description: 'Extra small text' },
  { name: 'text-sm', type: 'font', level: 'global', value: '0.875rem', group: 'size', description: 'Small text' },
  { name: 'text-base', type: 'font', level: 'global', value: '1rem', group: 'size', description: 'Base text' },
  { name: 'text-lg', type: 'font', level: 'global', value: '1.125rem', group: 'size', description: 'Large text' },
  { name: 'text-xl', type: 'font', level: 'global', value: '1.25rem', group: 'size', description: 'Extra large text' },
  { name: 'text-2xl', type: 'font', level: 'global', value: '1.5rem', group: 'size', description: '2x large text' },
  { name: 'text-3xl', type: 'font', level: 'global', value: '1.875rem', group: 'size', description: '3x large text' },
  { name: 'text-4xl', type: 'font', level: 'global', value: '2.25rem', group: 'size', description: '4x large text' },
  { name: 'font-normal', type: 'font', level: 'global', value: '400', group: 'weight', description: 'Normal font weight' },
  { name: 'font-medium', type: 'font', level: 'global', value: '500', group: 'weight', description: 'Medium font weight' },
  { name: 'font-semibold', type: 'font', level: 'global', value: '600', group: 'weight', description: 'Semibold font weight' },
  { name: 'font-bold', type: 'font', level: 'global', value: '700', group: 'weight', description: 'Bold font weight' }
]

const spacing: Token[] = [
  { name: 'spacing-0', type: 'spacing', level: 'global', value: '0', group: 'base', description: 'Zero spacing' },
  { name: 'spacing-1', type: 'spacing', level: 'global', value: '0.25rem', group: 'base', description: '4px spacing' },
  { name: 'spacing-2', type: 'spacing', level: 'global', value: '0.5rem', group: 'base', description: '8px spacing' },
  { name: 'spacing-3', type: 'spacing', level: 'global', value: '0.75rem', group: 'base', description: '12px spacing' },
  { name: 'spacing-4', type: 'spacing', level: 'global', value: '1rem', group: 'base', description: '16px spacing' },
  { name: 'spacing-5', type: 'spacing', level: 'global', value: '1.25rem', group: 'base', description: '20px spacing' },
  { name: 'spacing-6', type: 'spacing', level: 'global', value: '1.5rem', group: 'base', description: '24px spacing' },
  { name: 'spacing-8', type: 'spacing', level: 'global', value: '2rem', group: 'base', description: '32px spacing' },
  { name: 'spacing-10', type: 'spacing', level: 'global', value: '2.5rem', group: 'base', description: '40px spacing' },
  { name: 'spacing-12', type: 'spacing', level: 'global', value: '3rem', group: 'base', description: '48px spacing' },
  { name: 'spacing-16', type: 'spacing', level: 'global', value: '4rem', group: 'base', description: '64px spacing' }
]

const radius: Token[] = [
  { name: 'radius-none', type: 'radius', level: 'global', value: '0', group: 'base', description: 'No border radius' },
  { name: 'radius-sm', type: 'radius', level: 'global', value: '0.125rem', group: 'base', description: 'Small border radius' },
  { name: 'radius-md', type: 'radius', level: 'global', value: '0.375rem', group: 'base', description: 'Medium border radius' },
  { name: 'radius-lg', type: 'radius', level: 'global', value: '0.5rem', group: 'base', description: 'Large border radius' },
  { name: 'radius-xl', type: 'radius', level: 'global', value: '0.75rem', group: 'base', description: 'Extra large border radius' },
  { name: 'radius-full', type: 'radius', level: 'global', value: '9999px', group: 'base', description: 'Full circle border radius' }
]

const shadows: Token[] = [
  { name: 'shadow-sm', type: 'shadow', level: 'global', value: '0 1px 2px 0 rgb(0 0 0 / 0.05)', group: 'base', description: 'Small shadow' },
  { name: 'shadow-md', type: 'shadow', level: 'global', value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', group: 'base', description: 'Medium shadow' },
  { name: 'shadow-lg', type: 'shadow', level: 'global', value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', group: 'base', description: 'Large shadow' },
  { name: 'shadow-xl', type: 'shadow', level: 'global', value: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', group: 'base', description: 'Extra large shadow' }
]

const durations: Token[] = [
  { name: 'duration-75', type: 'duration', level: 'global', value: '75ms', group: 'base', description: 'Fastest duration' },
  { name: 'duration-100', type: 'duration', level: 'global', value: '100ms', group: 'base', description: 'Fast duration' },
  { name: 'duration-150', type: 'duration', level: 'global', value: '150ms', group: 'base', description: 'Medium fast duration' },
  { name: 'duration-200', type: 'duration', level: 'global', value: '200ms', group: 'base', description: 'Medium duration' },
  { name: 'duration-300', type: 'duration', level: 'global', value: '300ms', group: 'base', description: 'Slow duration' },
  { name: 'duration-500', type: 'duration', level: 'global', value: '500ms', group: 'base', description: 'Slowest duration' }
]

const breakpoints: Token[] = [
  { name: 'breakpoint-sm', type: 'breakpoint', level: 'global', value: '640px', group: 'base', description: 'Small breakpoint' },
  { name: 'breakpoint-md', type: 'breakpoint', level: 'global', value: '768px', group: 'base', description: 'Medium breakpoint' },
  { name: 'breakpoint-lg', type: 'breakpoint', level: 'global', value: '1024px', group: 'base', description: 'Large breakpoint' },
  { name: 'breakpoint-xl', type: 'breakpoint', level: 'global', value: '1280px', group: 'base', description: 'Extra large breakpoint' },
  { name: 'breakpoint-2xl', type: 'breakpoint', level: 'global', value: '1536px', group: 'base', description: '2x large breakpoint' }
]

export const globalTokenGroups: TokenGroup[] = [
  { name: 'Colors', tokens: colors, order: 1 },
  { name: 'Typography', tokens: fonts, order: 2 },
  { name: 'Spacing', tokens: spacing, order: 3 },
  { name: 'Border Radius', tokens: radius, order: 4 },
  { name: 'Shadows', tokens: shadows, order: 5 },
  { name: 'Animation', tokens: durations, order: 6 },
  { name: 'Breakpoints', tokens: breakpoints, order: 7 }
]

export const allGlobalTokens = globalTokenGroups.flatMap(g => g.tokens)