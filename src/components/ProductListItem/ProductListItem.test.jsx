import React from 'react'
import { render, screen } from '@/utils/test-utils'
import ProductListItem from '.'

describe('product list item', () => {
  it('should render', () => {
    const product = {
      id: 1,
      name: 'DeWalt Saw Machine',
      price: 249,
    }
    render(<ProductListItem product={product} />, { renderer: 'router' })

    expect(screen.getByRole('link')).not.toBeFalsy()
    expect(screen.getByRole('link')).toMatchSnapshot()
  })

  it('should not render if product is falsy', () => {
    render(<ProductListItem product={null} />, { renderer: 'router' })
    expect(screen.queryByRole('link')).toBeFalsy()
  })

  it('should not render if product is undefined', () => {
    render(<ProductListItem product={undefined} />, { renderer: 'router' })
    expect(screen.queryByRole('link')).toBeFalsy()
  })
})
