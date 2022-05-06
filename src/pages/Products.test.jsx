import { render, screen } from '@/utils/test-utils'
import Products from './Products'
import { products } from '@/mocks/fixtures/products'

describe('page: Products', () => {
  it('should render', () => {
    render(<Products />, { renderer: 'complete' })
    setTimeout(() => {
      products.forEach((product) => {
        expect(screen.getByText(product.name)).not.toBeFalsy()
        expect(screen.getByText(product.price)).not.toBeFalsy()
      })
    }, 200)
  })
})
