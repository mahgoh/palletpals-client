import React from 'react'
import { render, screen } from '@/utils/test-utils'
import Table from '.'

describe('table', () => {
  it('should render', () => {
    const rows = [
      {
        key: 'First',
        value: 10,
      },
      {
        key: 'Second',
        value: 'Something',
      },
    ]

    render(<Table rows={rows} />)
    expect(screen.getByRole('table')).toBeTruthy()
    expect(screen.getByRole('table')).toMatchSnapshot()
  })

  it('should render with no rows', () => {
    render(<Table rows={[]} />)
    expect(screen.queryByRole('table')).toBeNull()
    expect(screen.queryByRole('table')).toMatchSnapshot()
  })

  it('should not render children', () => {
    render(
      <Table rows={[]}>
        <div>should not be rendered</div>
      </Table>
    )
    expect(screen.queryByRole('table')).toBeNull()
    expect(screen.queryByRole('table')).toMatchSnapshot()
  })

  it('should not render', () => {
    const { container } = render(<Table />)
    expect(container).toBeEmptyDOMElement()
  })
})
