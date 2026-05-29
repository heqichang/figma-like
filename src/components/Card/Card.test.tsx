import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from './Card'

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders header when provided', () => {
    render(<Card header="Card Header">Content</Card>)
    expect(screen.getByText('Card Header')).toBeInTheDocument()
  })

  it('renders footer when provided', () => {
    render(<Card footer="Card Footer">Content</Card>)
    expect(screen.getByText('Card Footer')).toBeInTheDocument()
  })

  it('applies bordered class by default', () => {
    const { container } = render(<Card>Content</Card>)
    const card = container.firstChild as HTMLElement
    expect(card.className).toContain('card--bordered')
  })

  it('applies shadow class by default', () => {
    const { container } = render(<Card>Content</Card>)
    const card = container.firstChild as HTMLElement
    expect(card.className).toContain('card--shadow')
  })

  it('removes border when bordered is false', () => {
    const { container } = render(<Card bordered={false}>Content</Card>)
    const card = container.firstChild as HTMLElement
    expect(card.className).not.toContain('card--bordered')
  })

  it('removes shadow when shadow is false', () => {
    const { container } = render(<Card shadow={false}>Content</Card>)
    const card = container.firstChild as HTMLElement
    expect(card.className).not.toContain('card--shadow')
  })

  it('applies no-padding class when padding is false', () => {
    const { container } = render(<Card padding={false}>Content</Card>)
    const body = container.querySelector('[class*="card-body"]')
    expect(body?.className).toContain('no-padding')
  })

  it('merges custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>)
    const card = container.firstChild as HTMLElement
    expect(card.className).toContain('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Card ref={ref}>Content</Card>)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('DIV')
  })
})
