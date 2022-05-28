import { useEffect, useState } from 'react'
import { useFetch, Fetch } from '@/services/fetch'
import { productImageURL } from '@/utils/common'

export const Product = {
  all() {
    let [products, setProducts] = useState([])

    let { data, error, loading } = useFetch('/products')

    useEffect(() => {
      if (data) {
        setProducts(
          data.map((product) => {
            return {
              id: product.id,
              name: product.name,
              price: product.price,
              image:
                product.productImages.length > 0
                  ? productImageURL(product.productImages[0].id)
                  : null,
            }
          })
        )
      }
    }, [data])

    return {
      products,
      error,
      loading,
    }
  },
  byId(id) {
    let [product, setProduct] = useState({})

    let { data, error, loading } = useFetch(`/products/${id}`)

    useEffect(() => {
      if (error === null && data) {
        setProduct({
          ...data,
          productImages: data.productImages.map((image) => {
            return {
              src: productImageURL(image.id),
              alt: `${data.name} ${image.id}`,
            }
          }),
        })
      }
    }, [data])

    return {
      product,
      error,
      loading,
    }
  },
}

export const Cart = {
  async get() {
    try {
      const data = await Fetch('/shopping').then((res) => res.json())
      return data
    } catch (error) {
      throw error
    }
  },
  async add(productId, amount) {
    await Fetch('/shopping', {
      method: 'POST',
      body: JSON.stringify({
        quantity: amount,
        product: {
          id: productId,
        },
      }),
    }).then((res) => {
      if (res.status !== 201) throw new Error('Could not add to cart')
    })
  },
  async update(productId, amount) {
    await Fetch(`/shopping/${productId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        quantity: amount,
      }),
    }).then((res) => {
      if (res.status !== 202) throw new Error('Could not update cart item')
    })
  },
  async remove(productId) {
    await Fetch(`/shopping/${productId}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.status !== 202) throw new Error('Could not delete cart item')
    })
  },
  async order() {
    await Fetch('/orders', {
      method: 'POST',
    }).then((res) => {
      if (res.status !== 201) throw new Error('Could not create order')
    })
  },
}

export const Order = {
  all() {
    return useFetch('/orders')
  },
  byId(id) {
    return useFetch(`/orders/${id}`)
  },
}

export const User = {
  // TODO: Implement remember
  login(credentials, callback) {
    Fetch('/user/login', {
      method: 'POST',
      body: JSON.stringify({
        ...credentials,
        remember: false,
      }),
    }).then((res) => {
      callback(res.status === 200)
    })
  },
  logout(callback) {
    Fetch('/user/logout').then(() => {
      callback()
    })
  },
  async settings() {
    const data = await Fetch('/user/profile').then((res) => res.json())

    return {
      appearance: data.appearance,
      language: data.language,
    }
  },
  profile() {
    return useFetch('/user/profile')
  },
  register(credentials, callback) {
    Fetch('/user/register', {
      method: 'POST',
      body: JSON.stringify({
        ...credentials,
        role: 'USER',
      }),
    }).then((res) => {
      callback(res.status === 200)
    })
  },
  patch(payload) {
    return Fetch('/user/profile', {
      method: 'PATCH',
      body: JSON.stringify(payload),
    })
  },
  async validate() {
    const res = await Fetch('/user/validate')
    return res.status === 200
  },
}

export default {
  Cart,
  Order,
  Product,
  User,
}
