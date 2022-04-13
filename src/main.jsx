import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import Router from '@/Router'
import './i18n'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Suspense fallback="loading">
      <Router />
    </Suspense>
  </React.StrictMode>
)

// Print App version
console.log(`PalletPals v${GLOBAL.APP_VERSION}`)
