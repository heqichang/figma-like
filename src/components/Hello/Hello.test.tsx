import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hello } from './Hello'

describe('Hello', () => {
  it('renders children correctly', () => {
    render(<Hello>Test Hello</Hello>)
    expect(screen.getByText('Test Hello')).toBeInTheDocument()
  })

  it('applies variant class correctly', () => {
    const { container } = render(<Hello variant="primary">Test</Hello>)
    expect(container.firstChild).toHaveClass('hello--variant-primary')
  })

  it('applies size class correctly', () => {
    const { container } = render(<Hello size="sm">Test</Hello>)
    expect(container.firstChild).toHaveClass('hello--size-sm')
  })

  it('merges custom className', () => {
    const { container } = render(<Hello className="custom-class">Test</Hello>)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
