import { useEffect, useState } from 'react'
import { useFetch, Fetch } from '@/services/fetch'
import { productImageURL } from '@/utils/common'

export const Product = {
  all() {
    let [products, setProducts] = useState([])

    let { data, error, loading, load } = useFetch('/products')

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
      data,
      products,
      error,
      loading,
      load,
    }
  },
  async create(payload) {
    await Fetch('/products', {
      method: 'POST',
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.status !== 201) throw new Error('Could not create product')
    })
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
      data,
      product,
      error,
      loading,
    }
  },
  patch(productId, payload) {
    return Fetch(`/products/${productId}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.status !== 202) throw new Error('Could not patch product')
    })
  },
  async remove(productId) {
    await Fetch(`/products/${productId}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.status !== 202) throw new Error('Could not delete product')
    })
  },
}

export const ProductImage = {
  async create(file) {
    const formData = new FormData()
    formData.append('image', file)

    return await Fetch('/product-images', {
      method: 'POST',
      headers: {},
      body: formData,
    })
      .then((res) => {
        if (res.status !== 202)
          throw new Error('Could not create product image')
        return res.json()
      })
      .then((data) => {
        return {
          id: data.id,
        }
      })
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
    return await Fetch('/orders', {
      method: 'POST',
    }).then((res) => {
      if (res.status !== 201) throw new Error('Could not create order')
      return res.json()
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
  async reOrder(orderId) {
    await Fetch(`/shopping/${orderId}`, {
      method: 'POST',
    }).then((res) => {
      if (res.status !== 200) throw new Error('Could not reorder order')
    })
  },
}

export const User = {
  login(credentials, callback) {
    Fetch('/user/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
      .then((res) => {
        callback(res.status === 200)
      })
      .catch(() => {
        callback(false)
      })
  },
  logout(callback) {
    Fetch('/user/logout').then(() => {
      callback()
    })
  },
  async settings() {
    try {
      const data = await Fetch('/user/profile').then((res) => res.json())

      return {
        appearance: data.appearance,
        language: data.language,
      }
    } catch (e) {
      throw e
    }
  },
  profile() {
    return useFetch('/user/profile')
  },
  register(payload, callback) {
    Fetch('/user/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
      .then((res) => {
        callback(res.status === 200)
      })
      .catch(() => {
        callback(false)
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
  async validateAdmin() {
    const res = await Fetch('/user/validateAdmin')
    return res.status === 200
  },
}

export const ServiceProvider = {
  all() {
    return useFetch('/serviceproviders')
  },
  async create(payload) {
    await Fetch('/serviceproviders', {
      method: 'POST',
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.status !== 201)
        throw new Error('Could not create service provider')
    })
  },
  byId(id) {
    return useFetch(`/serviceproviders/${id}`)
  },
  patch(serviceProviderId, payload) {
    return Fetch(`/serviceproviders/${serviceProviderId}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.status !== 202)
        throw new Error('Could not patch service provider')
    })
  },
  async remove(serviceProviderId) {
    await Fetch(`/serviceproviders/${serviceProviderId}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.status !== 202)
        throw new Error('Could not delete service provider')
    })
  },
}

export const Warehouse = {
  all() {
    return useFetch('/warehouses')
  },
  async create(payload) {
    await Fetch('/warehouses', {
      method: 'POST',
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.status !== 201) throw new Error('Could not create warehouse')
    })
  },
  byId(id) {
    return useFetch(`/warehouses/${id}`)
  },
  patch(warehouseId, payload) {
    return Fetch(`/warehouses/${warehouseId}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.status !== 202) throw new Error('Could not patch warehouse')
    })
  },
  async remove(warehouseId) {
    await Fetch(`/warehouses/${warehouseId}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.status !== 202) throw new Error('Could not delete warehouse')
    })
  },
}

export default {
  Cart,
  Order,
  Product,
  ProductImage,
  User,
  ServiceProvider,
  Warehouse,
}
