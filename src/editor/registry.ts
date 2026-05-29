import type { ComponentRegistryItem } from './types'

export const componentRegistry: ComponentRegistryItem[] = [
  {
    type: 'Button',
    name: 'Button',
    category: 'Actions',
    defaultProps: {
      variant: 'primary',
      size: 'md',
      children: 'Button',
      isLoading: false,
      isFullWidth: false
    },
    propTypes: {
      variant: { type: 'select', options: ['primary', 'secondary', 'outline', 'ghost', 'danger'], defaultValue: 'primary', description: 'Button visual variant' },
      size: { type: 'select', options: ['sm', 'md', 'lg'], defaultValue: 'md', description: 'Button size' },
      children: { type: 'string', defaultValue: 'Button', description: 'Button label text' },
      isLoading: { type: 'boolean', defaultValue: false, description: 'Show loading state' },
      isFullWidth: { type: 'boolean', defaultValue: false, description: 'Full width button' },
      disabled: { type: 'boolean', defaultValue: false, description: 'Disabled state' }
    }
  },
  {
    type: 'Input',
    name: 'Input',
    category: 'Forms',
    defaultProps: {
      size: 'md',
      placeholder: 'Enter text...',
      label: '',
      errorMessage: '',
      helperText: ''
    },
    propTypes: {
      size: { type: 'select', options: ['sm', 'md', 'lg'], defaultValue: 'md', description: 'Input size' },
      placeholder: { type: 'string', defaultValue: 'Enter text...', description: 'Placeholder text' },
      label: { type: 'string', defaultValue: '', description: 'Input label' },
      errorMessage: { type: 'string', defaultValue: '', description: 'Error message' },
      helperText: { type: 'string', defaultValue: '', description: 'Helper text' },
      disabled: { type: 'boolean', defaultValue: false, description: 'Disabled state' }
    }
  },
  {
    type: 'Card',
    name: 'Card',
    category: 'Layout',
    defaultProps: {
      bordered: true,
      shadow: true,
      padding: true,
      header: '',
      footer: '',
      children: 'Card content'
    },
    propTypes: {
      bordered: { type: 'boolean', defaultValue: true, description: 'Show border' },
      shadow: { type: 'boolean', defaultValue: true, description: 'Show shadow' },
      padding: { type: 'boolean', defaultValue: true, description: 'Apply padding' },
      header: { type: 'string', defaultValue: '', description: 'Card header text' },
      footer: { type: 'string', defaultValue: '', description: 'Card footer text' },
      children: { type: 'string', defaultValue: 'Card content', description: 'Card body content' }
    }
  },
  {
    type: 'Icon',
    name: 'Icon',
    category: 'Media',
    defaultProps: {
      name: 'check',
      size: 24
    },
    propTypes: {
      name: { type: 'select', options: ['check', 'close', 'chevron-down', 'chevron-up', 'chevron-left', 'chevron-right', 'search', 'plus', 'minus', 'info', 'warning', 'error', 'eye', 'eye-off', 'settings', 'copy'], defaultValue: 'check', description: 'Icon name' },
      size: { type: 'select', options: ['16', '20', '24', '32'], defaultValue: '24', description: 'Icon size' },
      color: { type: 'string', defaultValue: 'currentColor', description: 'Icon color' }
    }
  }
]
