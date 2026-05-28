import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'
import { Button } from '../Button'
import type { CardProps } from './types'

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A flexible card component for displaying content.'
      }
    }
  },
  argTypes: {
    bordered: {
      control: 'boolean',
      description: 'Whether the card has a border'
    },
    shadow: {
      control: 'boolean',
      description: 'Whether the card has a shadow'
    },
    padding: {
      control: 'boolean',
      description: 'Whether the card content has padding'
    }
  }
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is a basic card component.'
  }
}

export const WithHeader: Story = {
  args: {
    header: 'Card Title',
    children: 'This card has a header section.'
  }
}

export const WithFooter: Story = {
  args: {
    header: 'Card Title',
    children: 'This card has both header and footer sections.',
    footer: (
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
        <Button variant="outline" size="sm">Cancel</Button>
        <Button size="sm">Confirm</Button>
      </div>
    )
  }
}

export const WithoutBorder: Story = {
  args: {
    bordered: false,
    children: 'This card has no border.'
  }
}

export const WithoutShadow: Story = {
  args: {
    shadow: false,
    children: 'This card has no shadow.'
  }
}

export const WithoutPadding: Story = {
  args: {
    padding: false,
    children: (
      <div style={{ background: 'var(--brand-primary-light)', padding: 'var(--card-padding)' }}>
        Custom content with its own padding.
      </div>
    )
  }
}

export const Complex: Story = {
  render: (args: CardProps) => (
    <Card {...args} style={{ maxWidth: '400px' }}>
      <div style={{ marginBottom: '1rem', fontWeight: 600, fontSize: '1.125rem' }}>
        Welcome to Component Library
      </div>
      <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
        A modern React component library built with TypeScript, featuring design tokens,
        Storybook documentation, and a complete build pipeline.
      </p>
    </Card>
  )
}