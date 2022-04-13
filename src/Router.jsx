import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'

// Routes
import First from './pages/First'
import Second from './pages/Second'
import NotFound from './pages/NotFound'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="first" element={<First />} />
          <Route path="second" element={<Second />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
