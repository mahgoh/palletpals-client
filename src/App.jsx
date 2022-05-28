import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '@/services/auth'
import { AppearanceProvider } from '@/services/appearance'
import { CartProvider } from '@/services/cart'
import { LanguageProvider } from '@/services/language'
import { NotificationProvider } from '@/services/notification'
import Header from '@/components/Header'

function App() {
  const { validate } = useAuth()

  useEffect(() => {
    validate()
  }, [])

  return (
    <AppearanceProvider>
      <LanguageProvider>
        <CartProvider>
          <div className="min-h-screen dark:bg-gray-900 dark:text-gray-100">
            <Header />
            <NotificationProvider>
              <Outlet />
            </NotificationProvider>
          </div>
        </CartProvider>
      </LanguageProvider>
    </AppearanceProvider>
  )
}

export default App
