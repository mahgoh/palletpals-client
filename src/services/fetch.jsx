import { useEffect, useState } from 'react'

export function useFetch(path, options) {
  let [data, setData] = useState(null)
  let [status, setStatus] = useState(null)
  let [error, setError] = useState(null)
  let [loading, setLoading] = useState(false)

  useEffect(() => {
    // in test env
    if (GLOBAL.DEBUG) {
      options = { ...options }
    }

    setLoading(true)

    Fetch(path, options)
      .then((res) => {
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
  return fetch(`${GLOBAL.API_URL}${path}`, options)
}
