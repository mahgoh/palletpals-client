import { useEffect, useState } from 'react'
import fetch from 'cross-fetch'

export function useFetch(path, options) {
  let [data, setData] = useState(null)
  let [status, setStatus] = useState(null)
  let [error, setError] = useState(null)
  let [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    Fetch(path, options)
      .then(async (res) => {
        if (res.status >= 300) throw await res.json()

        setStatus(res.status)
        return res.json()
      })
      .then(
        (result) => {
          setData(result)
          setLoading(false)
        },
        (error) => {
          setError(error)
          setLoading(false)
        }
      )
  }, [path, options])

  return {
    data,
    status,
    error,
    loading,
  }
}

export function Fetch(path, options) {
  options = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  }

  return fetch(`${GLOBAL.API_URL}${path}`, options)
}
