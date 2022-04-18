import React from 'react'
import { render, screen } from '@/utils/test-utils'
import Navigation from '.'

describe('navigation', () => {
  it('should render correctly', () => {
    const routes = [
      {
        to: '/one',
        label: 'One',
      },
      {
        to: '/two',
        label: 'Two',
      },
    ]

    render(<Navigation routes={routes} />, { renderer: 'router' })
    expect(screen.getByRole('navigation').children.length).toBe(routes.length)
    expect(screen.getByRole('navigation').children[0]).toHaveTextContent(
      routes[0].label
    )
    expect(screen.getByRole('navigation')).toMatchSnapshot()
  })
})
