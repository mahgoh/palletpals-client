import React from 'react'
import { render, screen } from '@/utils/test-utils'
import Subheading from '.'

describe('subheading', () => {
  it('should render', () => {
    render(<Subheading title="Hello" />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Hello')
  })

  it('should not render children', () => {
    render(
      <Subheading title="Hello">
        <div>should not be rendered</div>
      </Subheading>
    )
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Hello')
    expect(screen.getByRole('heading', { level: 2 })).toMatchSnapshot()
  })
})
