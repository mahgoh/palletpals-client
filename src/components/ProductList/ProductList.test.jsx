import React from 'react'
import { render } from '@/utils/test-utils'
import ProductList from '.'

describe('product list', () => {
  it('should render', () => {
    const products = [
      {
        id: 1,
        name: 'DeWalt Saw Machine',
        price: 249,
      },
      {
        id: 2,
        name: 'Cover Suspension System',
        price: 89,
      },
    ]
    const { container } = render(<ProductList products={products} />, {
      renderer: 'router',
    })

    expect(container).not.toBeFalsy()
    expect(container).toMatchSnapshot()
  })

  it('should not render if products is falsy', () => {
    const { container } = render(<ProductList products={null} />, {
      renderer: 'router',
    })

    expect(container).toBeEmptyDOMElement()
  })

  it('should not render if products is undefined', () => {
    const { container } = render(<ProductList products={undefined} />, {
      renderer: 'router',
    })

    expect(container).toBeEmptyDOMElement()
  })
})
