import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RequireAuth } from '@/services/auth'
import App from '@/App'

// Routes
import Home from '@/pages/Home'
import Products from '@/pages/Products'
import Product from '@/pages/Product'
import Cart from '@/pages/Cart'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Profile from '@/pages/Profile'
import ProfileEdit from '@/pages/ProfileEdit'
import NotFound from '@/pages/NotFound'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:productId" element={<Product />} />
          <Route
            path="cart"
            element={
              <RequireAuth>
                <Cart />
              </RequireAuth>
            }
          />
          <Route
            path="profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="profile/edit"
            element={
              <RequireAuth>
                <ProfileEdit />
              </RequireAuth>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
