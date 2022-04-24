import { useEffect, useState } from 'react'
import { useFetch, Fetch } from '@/services/fetch'

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
  async validate() {
    const res = await Fetch('/user/validate')
    return res.status === 200
  },
}
