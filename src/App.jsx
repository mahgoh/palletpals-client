import { Outlet } from 'react-router-dom'
import { AppearanceProvider } from '@/services/appearance'
import { LanguageProvider } from '@/services/language'
import Header from '@/components/Header'

function App() {
  return (
    <AppearanceProvider>
      <LanguageProvider>
        <div className="min-h-screen dark:bg-gray-900 dark:text-gray-100">
          <Header />
          <Outlet />
        </div>
      </LanguageProvider>
    </AppearanceProvider>
  )
}

export default App
