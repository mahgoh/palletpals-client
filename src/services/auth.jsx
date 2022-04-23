import { createContext, useContext, useState } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { User } from '@/services/api'

let AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  let [authenticated, setAuthenticated] = useState(false)

  let login = (newUser, callback) => {
    return User.login(newUser, (authenticated) => {
      setAuthenticated(authenticated)
      callback()
    })
  }

  let logout = (callback) => {
    return User.logout(() => {
      setAuthenticated(false)
      callback()
    })
  }

  let validate = (callback) => {
    return User.validate((authenticated) => {
      setAuthenticated(authenticated)
      callback()
    })
  }

  let value = { authenticated, login, logout, validate }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function RequireAuth({ children }) {
  let auth = useAuth()
  let location = useLocation()

  auth.validate(() => {
    if (!auth.authenticated) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />
    }
  })

  return children
}
