import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/services/auth'
import { useCart } from '@/services/cart'
import MenuBar from './MenuBar'
import MenuBarMobile from './MenuBarMobile'

export default function Header() {
  const { t } = useTranslation()
  const { authenticated, isAdmin } = useAuth()
  const { cart } = useCart()

  let routes = [
    {
      to: '/products',
      label: t('common.product.title', { numProducts: 2 }),
    },
  ]

  if (authenticated && isAdmin) {
    routes.unshift({
      to: '/admin',
      label: t('common.admin'),
    })
  }

  const routesMobile = [
    {
      to: '/',
      label: t('common.home'),
    },
    ...routes,
  ]

  if (authenticated) {
    routes.push({
      to: '/profile',
      label: t('common.profile.title'),
    })
    routes.push({
      to: '/logout',
      label: t('common.auth.logout'),
    })
    routesMobile.push({
      to: '/cart',
      label: t('common.cart.title'),
      count: cart.shoppingCart.length,
    })
    routesMobile.push({
      to: '/profile',
      label: t('common.profile.title'),
    })
    routesMobile.push({
      to: '/logout',
      label: t('common.auth.logout'),
    })
  } else {
    routes.push({
      to: '/login',
      label: t('common.auth.login'),
    })
    routesMobile.push({
      to: '/login',
      label: t('common.auth.login'),
    })
  }

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
        <MenuBar routes={routes} />
        <MenuBarMobile routes={routesMobile} />
      </div>
    </header>
  )
}
