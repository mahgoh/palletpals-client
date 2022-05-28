import React from 'react'
import { render, screen } from '@/utils/test-utils'
import Subheading from '.'

describe('subheading', () => {
  it('should render', () => {
    render(<Subheading title="Hello" />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Hello')
  })

  it('should render children', () => {
    const { container } = render(
      <Subheading title="Hello">
        <div>should be rendered</div>
      </Subheading>
    )
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Hello')
    expect(container).toMatchSnapshot()
  })
})
