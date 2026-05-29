import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input', () => {
  it('renders input element', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('renders label when provided', () => {
    render(<Input label="Username" />)
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
  })

  it('renders helper text', () => {
    render(<Input helperText="Enter your username" />)
    expect(screen.getByText('Enter your username')).toBeInTheDocument()
  })

  it('renders error message', () => {
    render(<Input errorMessage="This field is required" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('sets aria-invalid when error is present', () => {
    render(<Input errorMessage="Error" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('sets aria-describedby for error message', () => {
    render(<Input errorMessage="Error message" />)
    const input = screen.getByRole('textbox')
    const errorId = input.getAttribute('aria-describedby')
    expect(errorId).toBeTruthy()
  })

  it('sets aria-describedby for helper text', () => {
    render(<Input helperText="Help text" />)
    const input = screen.getByRole('textbox')
    const helperId = input.getAttribute('aria-describedby')
    expect(helperId).toBeTruthy()
  })

  it('renders left and right addons', () => {
    render(
      <Input
        leftAddon={<span data-testid="left-addon">$</span>}
        rightAddon={<span data-testid="right-addon">USD</span>}
      />
    )
    expect(screen.getByTestId('left-addon')).toBeInTheDocument()
    expect(screen.getByTestId('right-addon')).toBeInTheDocument()
  })

  it('handles text input', async () => {
    const user = userEvent.setup()
    render(<Input placeholder="Type here" />)
    const input = screen.getByPlaceholderText('Type here')
    await user.type(input, 'Hello World')
    expect(input).toHaveValue('Hello World')
  })

  it('merges custom className', () => {
    const { container } = render(<Input className="custom-class" />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.className).toContain('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} />)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('INPUT')
  })
})
