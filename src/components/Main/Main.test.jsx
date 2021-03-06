import React from 'react'
import { render, screen } from '@/utils/test-utils'
import Main from '.'

describe('main', () => {
  it('should render with text content', () => {
    render(<Main>Hello</Main>)
    expect(screen.getByRole('main')).toHaveTextContent('Hello')
  })

  it('should render with html content', () => {
    render(
      <Main>
        <div>Inside a div</div>
      </Main>
    )
    expect(screen.getByRole('main')).toContainHTML('<div>Inside a div</div>')
    expect(screen.getByRole('main')).toMatchSnapshot()
  })

  it('should render with center true', () => {
    render(<Main center>Hello</Main>)
    expect(screen.getByRole('main')).toHaveClass('flex flex-col items-center')
    expect(screen.getByRole('main')).toMatchSnapshot('Hello')
  })
})
