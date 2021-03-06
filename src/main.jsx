import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from '@/services/auth'
import Loader from '@/components/Loader'
import Router from '@/Router'
import '@/i18n'
import '@/index.css'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <Suspense fallback={<Loader />}>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </Suspense>
)

// Print App version
console.log(`PalletPals v${GLOBAL.APP_VERSION}`)
