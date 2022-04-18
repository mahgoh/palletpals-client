import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '@/App'
import { AuthProvider, RequireAuth } from '@/services/auth'

// Routes
import Home from '@/pages/Home'
import First from '@/pages/First'
import Login from '@/pages/Login'
import Profile from '@/pages/Profile'
import NotFound from '@/pages/NotFound'

export default function Router() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Home />} />
            <Route path="first" element={<First />} />
            <Route
              path="profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
