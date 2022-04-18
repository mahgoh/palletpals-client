import React from 'react'
import { render, screen } from '@/utils/test-utils'
import TextField from '.'

describe('textfield', () => {
  it('should render', () => {
    render(<TextField name="username" />)
    expect(screen.getByRole('textbox')).not.toBeFalsy()
    expect(screen.getByRole('textbox')).toMatchSnapshot()
  })

  it('should not render', () => {
    const { container } = render(<TextField />)
    expect(container).toBeEmptyDOMElement()
  })

  it('should render with label', () => {
    const { container } = render(<TextField name="username" label="Username" />)
    expect(container).toMatchSnapshot()
  })

  it('should render with error', () => {
    const { container } = render(
      <TextField name="username" label="Username" error="Required" />
    )
    expect(container).toMatchSnapshot()
  })

  it('should render with value', () => {
    const { container } = render(
      <TextField name="username" label="Username" value="test" />
    )
    expect(container).toMatchSnapshot()
  })

  it('should render with placeholder', () => {
    const { container } = render(
      <TextField name="username" label="Username" placeholder="Username" />
    )
    expect(container).toMatchSnapshot()
  })

  it('should render with type', () => {
    const { container } = render(
      <TextField name="password" label="Password" type="password" />
    )
    expect(container).toMatchSnapshot()
  })
})
