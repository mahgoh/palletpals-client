import React from 'react'
import { render, screen } from '@/utils/test-utils'
import Pagetitle from '.'

describe('pagetitle', () => {
  it('should render', () => {
    render(<Pagetitle title="Hello" />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hello')
  })

  it('should render children', () => {
    const { container } = render(
      <Pagetitle title="Hello">
        <div>should be rendered</div>
      </Pagetitle>
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hello')
    expect(container).toMatchSnapshot()
  })
})
