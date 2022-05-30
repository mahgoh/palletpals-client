import React from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { RequireAuth, RequireAdmin } from '@/services/auth'
import App from '@/App'

// Routes
// Public routes
import Home from '@/pages/Home'
import Products from '@/pages/Products'
import Product from '@/pages/Product'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import NotFound from '@/pages/NotFound'

// Private routes
import Cart from '@/pages/Cart'
import Orders from '@/pages/Orders'
import Order from '@/pages/Order'
import Profile from '@/pages/Profile'
import ProfileEdit from '@/pages/ProfileEdit'

// Admin routes
import Admin from '@/pages/Admin'
import AdminProducts from '@/pages/AdminProducts'
import AdminServiceProviders from '@/pages/AdminServiceProviders'
import AdminWarehouses from '@/pages/AdminWarehouses'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            path="admin/"
            element={
              <RequireAdmin>
                <Admin />
              </RequireAdmin>
            }
          >
            <Route
              path=""
              element={<Navigate to="products" replace={true} />}
            />
            <Route path="products" element={<AdminProducts />} />
            <Route
              path="service-providers"
              element={<AdminServiceProviders />}
            />
            <Route path="warehouses" element={<AdminWarehouses />} />
          </Route>
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
            path="orders"
            element={
              <RequireAuth>
                <Orders />
              </RequireAuth>
            }
          />
          <Route
            path="order/:orderId"
            element={
              <RequireAuth>
                <Order />
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
