import type { Meta, StoryObj } from '@storybook/react'
import { Hello } from './Hello'
import type { HelloProps } from './types'

const meta = {
  title: 'Components/Hello',
  component: Hello,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    }
  }
} satisfies Meta<HelloProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Hello Content',
    variant: 'default',
    size: 'md'
  }
}

export const Primary: Story = {
  args: {
    children: 'Primary Hello',
    variant: 'primary'
  }
}

export const Sizes: Story = {
  render: (args: HelloProps) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Hello {...args} size="sm">Small</Hello>
      <Hello {...args} size="md">Medium</Hello>
      <Hello {...args} size="lg">Large</Hello>
    </div>
  )
}
