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
        // try until JWT is valid
        const MAX_ROUNDS = 10
        let round = 0
        let success = false

        while (!success && round < MAX_ROUNDS) {
          await new Promise((resolve) =>
            setTimeout(async () => {
              try {
                // set/override appearance and language if authenticated
                const { appearance, language } = await User.settings()

                setAuthenticated(_authenticated)

                // TODO: replace this with actual admin validation
                setIsAdmin(true)

                callback(_authenticated, {
                  appearance: appearance.toLowerCase(),
                  language,
                })
                success = true
              } catch (e) {
                round++
              }
              resolve()
            }, 500)
          )
        }
      } else {
        callback(_authenticated, null)
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
  const auth = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

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

export function RequireAdmin({ children }) {
  const auth = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    async function validate() {
      // TODO: Implement actual admin validation
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
