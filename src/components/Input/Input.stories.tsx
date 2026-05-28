import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'
import type { InputProps } from './types'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A customizable input component with labels, error states, and addons.'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the input'
    },
    variant: {
      control: 'select',
      options: ['default', 'error'],
      description: 'The variant of the input'
    },
    label: {
      control: 'text',
      description: 'The label for the input'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display'
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled'
    }
  },
  args: {
    placeholder: 'Enter text...'
  }
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Enter text...'
  }
}

export const Sizes: Story = {
  render: (args: InputProps) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Input {...args} size="sm" label="Small" placeholder="Small input" />
      <Input {...args} size="md" label="Medium" placeholder="Medium input" />
      <Input {...args} size="lg" label="Large" placeholder="Large input" />
    </div>
  )
}

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'your@email.com',
    helperText: 'We\'ll never share your email.'
  }
}

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'your@email.com',
    variant: 'error',
    errorMessage: 'Please enter a valid email address.'
  }
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit',
    disabled: true
  }
}

export const WithAddons: Story = {
  render: (args: InputProps) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Input {...args} label="Search" placeholder="Search..." leftAddon={<span>🔍</span>} />
      <Input {...args} label="Price" placeholder="0.00" leftAddon={<span>$</span>} rightAddon={<span>USD</span>} />
    </div>
  )
}