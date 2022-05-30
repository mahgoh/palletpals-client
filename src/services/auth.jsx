import { createContext, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { User } from '@/services/api'

let AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  let [authenticated, setAuthenticated] = useState(false)
  let [isAdmin, setIsAdmin] = useState(false)

  let login = (newUser, callback) => {
    return User.login(newUser, async (_authenticated) => {
      if (_authenticated) {
        try {
          setAuthenticated(_authenticated)

          const userSettings = await User.settings()
          const isAdmin = await User.validateAdmin()
          setIsAdmin(isAdmin)

          callback(_authenticated, userSettings)
        } catch (e) {
          // Should never occur
          console.error(e)
        }
      } else {
        callback(_authenticated, null)
      }
    })
  }

  let logout = (callback) => {
    return User.logout(() => {
      setAuthenticated(false)
      setIsAdmin(false)
      callback()
    })
  }

  let validate = async (cb) => {
    const authenticated = await User.validate()
    setAuthenticated(authenticated)

    if (cb) cb(authenticated)
  }

  let validateAdmin = async (cb) => {
    const isAdmin = await User.validateAdmin()
    setIsAdmin(isAdmin)

    if (cb) cb(isAdmin)
  }

  let value = { authenticated, isAdmin, login, logout, validate, validateAdmin }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function RequireAuth({ children }) {
  const auth = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    async function validate() {
      auth.validate((authenticated) => {
        if (!authenticated) {
          navigate('/login', { replace: true, state: { from: location } })
        }
      })
    }
    validate()
  }, [])

  return children
}

export function RequireAdmin({ children }) {
  const auth = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    async function validate() {
      auth.validateAdmin((isAdmin) => {
        if (!isAdmin) {
          navigate('/', { replace: true, state: { from: location } })
        }
      })
    }
    validate()
  }, [])

  return children
}
