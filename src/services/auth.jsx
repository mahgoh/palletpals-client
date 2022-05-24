import { createContext, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { User } from '@/services/api'

let AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  let [authenticated, setAuthenticated] = useState(false)

  let login = (newUser, callback) => {
    return User.login(newUser, async (authenticated) => {
      setAuthenticated(authenticated)

      // set/override appearance and language if authenticated
      if (authenticated) {
        const { appearance, language } = await User.settings()

        callback(authenticated, {
          appearance: appearance.toLowerCase(),
          language,
        })
      } else {
        callback(authenticated, null)
      }
    })
  }

  let logout = (callback) => {
    return User.logout(() => {
      setAuthenticated(false)
      callback()
    })
  }

  let validate = async (cb) => {
    const authenticated = await User.validate()
    setAuthenticated(authenticated)

    if (cb) cb(authenticated)
  }

  let value = { authenticated, login, logout, validate }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function RequireAuth({ children }) {
  let auth = useAuth()
  let location = useLocation()
  let navigate = useNavigate()

  useEffect(() => {
    async function validate() {
      auth.validate((authenticated) => {
        if (!authenticated) {
          // Redirect them to the /login page, but save the current location they were
          // trying to go to when they were redirected. This allows us to send them
          // along to that page after they login, which is a nicer user experience
          // than dropping them off on the home page.
          navigate('/login', { replace: true, state: { from: location } })
        }
      })
    }
    validate()
  }, [])

  return children
}
