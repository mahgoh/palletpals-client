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
              image: productImageURL(product.productImages[0].id),
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

export const Shopping = {
  cart() {
    let [cart, setCart] = useState({
      shoppingCart: [],
    })

    let { data, error, loading } = useFetch('/shopping')

    useEffect(() => {
      if (data) {
        setCart(data)
      }
    }, [data])

    return {
      cart,
      error,
      loading,
    }
  },
  async add(productId, amount) {
    return new Promise((resolve, reject) => {
      Fetch('/shopping', {
        method: 'POST',
        body: JSON.stringify({
          quantity: amount,
          product: {
            id: productId,
          },
        }),
      })
        .then((res) => {
          if (res.status === 201) resolve()
          reject()
        })
        .catch(() => {
          reject()
        })
    })
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
  Product,
  Shopping,
  User,
}
