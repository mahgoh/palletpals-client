import { createContext, useContext, useState } from 'react'
import API from '@/services/api'

const CartContext = createContext()

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {
  let [cart, setCart] = useState({
    totalCost: 0,
    shippingCost: 0,
    shoppingCart: [],
  })

  let refreshCart = async () => {
    try {
      let data = await API.Cart.get()
      setCart(data)
    } catch (e) {
      console.error(e)
    }
  }

  let value = { cart, setCart, refreshCart }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
