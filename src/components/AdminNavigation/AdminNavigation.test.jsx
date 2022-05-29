import React from 'react'
import { render, screen } from '@/utils/test-utils'
import AdminNavigation from '.'

describe('admin navigation', () => {
  it('should render with text content', () => {
    const { container } = render(<AdminNavigation />, { renderer: 'complete' })
    expect(container).toMatchSnapshot()
  })

  it('should not render with children', () => {
    const { container } = render(
      <AdminNavigation>
        <div>should not be rendered</div>
      </AdminNavigation>,
      { renderer: 'complete' }
    )

    expect(screen.queryByText('should not be rendered')).toBeNull()
    expect(container).toMatchSnapshot()
  })
})
