import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navigation from '@/components/Navigation'
import AppearanceSelect from './AppearanceSelect'
import LanguageSelect from './LanguageSelect'
import Cart from './Cart'
import Logout from './Logout'

export default function Header() {
  const { t } = useTranslation()

  const routes = [
    {
      to: '/products',
      label: t('common.product.title', { numProducts: 2 }),
    },
    {
      to: '/profile',
      label: t('common.profile.title'),
    },
  ]

  return (
    <header className="sticky top-0 z-20 h-20 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto grid h-full grid-cols-2 px-4 lg:max-w-6xl lg:px-10">
        <Link
          to="/"
          className="inline-flex items-center text-3xl font-extrabold tracking-tight"
        >
          <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
            PalletPals
          </span>
        </Link>
        <div className="flex justify-end">
          <Navigation routes={routes} />
          <div className="ml-4 flex items-center space-x-2">
            <AppearanceSelect />
            <LanguageSelect />
          </div>
          <Cart />
          <Logout />
        </div>
      </div>
    </header>
  )
}
