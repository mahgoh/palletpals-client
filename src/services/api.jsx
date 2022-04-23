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
  validate(callback) {
    Fetch('/user/validate').then((res) => {
      callback(res.status === 200)
    })
  },
  profile() {
    return useFetch('/user/profile')
  },
}
