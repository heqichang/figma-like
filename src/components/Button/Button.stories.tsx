import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import type { ButtonProps } from './types'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A customizable button component with multiple variants and sizes.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: 'The visual style of the button'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button'
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether to show a loading spinner'
    },
    isFullWidth: {
      control: 'boolean',
      description: 'Whether the button takes full width'
    },
    onClick: {
      action: 'clicked',
      description: 'Callback fired when the button is clicked'
    }
  },
  args: {
    children: 'Button'
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button'
  }
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button'
  }
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button'
  }
}

export const Sizes: Story = {
  render: (args: ButtonProps) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  )
}

export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Loading...'
  }
}

export const FullWidth: Story = {
  args: {
    isFullWidth: true,
    children: 'Full Width Button'
  },
  parameters: {
    layout: 'padded'
  }
}

export const WithIcons: Story = {
  render: (args: ButtonProps) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button {...args} leftIcon={<span>◀</span>}>Previous</Button>
      <Button {...args} rightIcon={<span>▶</span>}>Next</Button>
    </div>
  )
}