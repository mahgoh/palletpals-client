import React from 'react'
import { render, screen } from '@/utils/test-utils'
import NavigationLink from '.'

describe('navigation link', () => {
  it('should render', () => {
    render(<NavigationLink to="/" label="Home" />, { renderer: 'router' })

    expect(screen.getByRole('link')).toHaveTextContent('Home')
  })

  it('should have active styling', () => {
    render(<NavigationLink to="/" label="Home" />, { renderer: 'router' })
    expect(screen.getByRole('link')).toHaveClass(
      'font-semibold',
      'text-orange-500'
    )
  })

  it('should have active styling on profile page', () => {
    render(<NavigationLink to="/profile" label="Profile" />, {
      route: 'profile',
      renderer: 'router',
    })
    expect(screen.getByRole('link')).toHaveClass(
      'font-semibold',
      'text-orange-500'
    )
  })

  it('should not have active styling', () => {
    render(<NavigationLink to="/profile" label="Profile" />, {
      renderer: 'router',
    })
    expect(screen.getByRole('link')).not.toHaveClass(
      'font-semibold',
      'text-orange-500'
    )
  })
})
