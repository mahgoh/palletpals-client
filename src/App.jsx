import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '@/services/auth'
import { AppearanceProvider } from '@/services/appearance'
import { CartProvider } from '@/services/cart'
import { LanguageProvider } from '@/services/language'
import {
  NotificationProvider,
  NotificationOutlet,
} from '@/services/notification'
import Header from '@/components/Header'

function App() {
  const { validate, validateAdmin } = useAuth()

  useEffect(() => {
    validate()
    validateAdmin()
  }, [])

  return (
    <AppearanceProvider>
      <LanguageProvider>
        <CartProvider>
          <NotificationProvider>
            <div className="min-h-screen dark:bg-gray-900 dark:text-gray-100">
              <Header />
              <NotificationOutlet />
              <Outlet />
            </div>
          </NotificationProvider>
        </CartProvider>
      </LanguageProvider>
    </AppearanceProvider>
  )
}

export default App
