import type { Preview } from '@storybook/react'
import '../src/styles/index.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'dark', value: '#111827' },
        { name: 'brand', value: '#FFFFFF' }
      ]
    }
  },
  tags: ['autodocs'],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'brand', title: 'Brand' }
        ],
        showName: true
      }
    }
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light'
      document.documentElement.setAttribute('data-theme', theme)
      document.documentElement.setAttribute('data-mode', theme === 'dark' ? 'dark' : 'light')
      return <Story />
    }
  ]
}

export default preview
