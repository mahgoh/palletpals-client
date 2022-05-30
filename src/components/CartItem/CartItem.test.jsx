import React from 'react'
import { render, screen } from '@/utils/test-utils'
import { cartItems } from '@/mocks/fixtures/cart'
import CartItem from '.'

describe('cart item', () => {
  it('should render', () => {
    const item = cartItems[0]
    const { container } = render(<CartItem item={item} />, {
      renderer: 'complete',
    })
    expect(screen.getByText(item.product.name)).toBeTruthy()
    expect(container).toMatchSnapshot()
  })

  it('should not render', () => {
    const { container } = render(<CartItem />, { renderer: 'complete' })
    expect(container).toBeEmptyDOMElement()
  })
})
