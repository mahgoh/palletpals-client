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

  const routes = {
    home: {
      to: '/',
      label: t('common.home'),
    },
    admin: {
      to: '/admin',
      label: t('common.admin'),
    },
    products: {
      to: '/products',
      label: t('common.product.title', { numProducts: 2 }),
    },
    profile: {
      to: '/profile',
      label: t('common.profile.title'),
    },
    cart: {
      to: '/cart',
      label: t('common.cart.title'),
      count: cart.shoppingCart.length,
    },
    login: {
      to: '/login',
      label: t('common.auth.login'),
    },
    logout: {
      to: '/logout',
      label: t('common.auth.logout'),
    },
  }

  let routesMain = [routes.products, routes.login]
  let routesMobile = [routes.home, routes.products, routes.login]

  if (authenticated) {
    routesMain = [routes.products, routes.profile, routes.logout]

    routesMobile = [
      routes.home,
      routes.products,
      routes.profile,
      routes.cart,
      routes.logout,
    ]

    if (isAdmin) {
      routesMain.unshift(routes.admin)
      routesMobile.splice(1, 0, routes.admin)
    }
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
        <MenuBar routes={routesMain} />
        <MenuBarMobile routes={routesMobile} />
      </div>
    </header>
  )
}
