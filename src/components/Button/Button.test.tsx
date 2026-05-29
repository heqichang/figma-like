import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('renders as a button element', () => {
    render(<Button>Button</Button>)
    const button = screen.getByRole('button')
    expect(button.tagName).toBe('BUTTON')
  })

  it('applies primary variant by default', () => {
    const { container } = render(<Button>Primary</Button>)
    const button = container.firstChild as HTMLElement
    expect(button.className).toContain('button--primary')
  })

  it('applies secondary variant', () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>)
    const button = container.firstChild as HTMLElement
    expect(button.className).toContain('button--secondary')
  })

  it('applies size classes', () => {
    const { container } = render(<Button size="sm">Small</Button>)
    const button = container.firstChild as HTMLElement
    expect(button.className).toContain('button--sm')
  })

  it('shows loading state', () => {
    render(<Button isLoading>Loading</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('applies full width class', () => {
    const { container } = render(<Button isFullWidth>Full Width</Button>)
    const button = container.firstChild as HTMLElement
    expect(button.className).toContain('button--full-width')
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    let clicked = false
    render(<Button onClick={() => { clicked = true }}>Click</Button>)
    await user.click(screen.getByRole('button'))
    expect(clicked).toBe(true)
  })

  it('does not fire click when disabled', async () => {
    const user = userEvent.setup()
    let clicked = false
    render(<Button disabled onClick={() => { clicked = true }}>Click</Button>)
    await user.click(screen.getByRole('button'))
    expect(clicked).toBe(false)
  })

  it('renders left and right icons', () => {
    render(
      <Button leftIcon={<span data-testid="left-icon">←</span>} rightIcon={<span data-testid="right-icon">→</span>}>
        With Icons
      </Button>
    )
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
  })

  it('merges custom className', () => {
    const { container } = render(<Button className="custom-class">Custom</Button>)
    const button = container.firstChild as HTMLElement
    expect(button.className).toContain('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Ref</Button>)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('BUTTON')
  })
})
