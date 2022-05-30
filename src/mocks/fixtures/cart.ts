import { Product, products } from './products'

export interface CartItem {
  id: number
  product: Product
  quantity: number
  pricePerUnit: number
}

export const cartItems: CartItem[] = [
  {
    id: 1,
    product: products[0],
    quantity: 2,
    pricePerUnit: products[0].price,
  },
]
