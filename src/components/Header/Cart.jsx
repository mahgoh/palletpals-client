import { useTranslation } from 'react-i18next'
import { ShoppingCartIcon } from '@heroicons/react/outline'
import { useAuth } from '@/services/auth'
import { useCart } from '@/services/cart'
import { LinkButton } from '@/components/Button'
import CartItem from './CartItem'

export default function Cart() {
  const { t } = useTranslation()
  const auth = useAuth()
  const { cart } = useCart()

  function renderCartItems() {
    if (!cart || cart.length === 0) {
      return null
    }

    return cart.shoppingCart.map((cartItem, i) => (
      <CartItem key={i} cartItem={cartItem} />
    ))
  }

  function renderCart() {
    if (!auth.authenticated) {
      return (
        <>
          <div>{t('common.cart.not-authenticated')}</div>
          <LinkButton to="/login" className="mt-4 w-full">
            {t('common.auth.login')}
          </LinkButton>
        </>
      )
    }

    return (
      <>
        <div className="w-full grow justify-start divide-y divide-gray-200 overflow-y-auto dark:divide-gray-700">
          {renderCartItems()}
        </div>
        <LinkButton to="/cart" className="mt-4 w-full">
          {t('common.cart.go')}
        </LinkButton>
      </>
    )
  }

  return (
    <div className="group ml-4 flex items-center">
      <ShoppingCartIcon
        className="h-5 w-5 cursor-pointer text-gray-600 transition-colors hover:text-orange-500 focus:text-orange-500 dark:text-gray-100 dark:hover:text-orange-500"
        aria-hidden="true"
      />
      <div className="absolute top-0 right-0 z-20 hidden h-screen w-screen transition-all group-hover:block md:w-1/3">
        <div className="flex h-full w-full flex-col border-l border-gray-200 bg-white p-8 text-left dark:border-gray-700 dark:bg-gray-900">
          <h2 className="pb-10 pt-4 text-2xl font-extrabold leading-10 tracking-tight sm:text-3xl sm:leading-none">
            {t('common.cart.title')}
          </h2>
          {renderCart()}
        </div>
      </div>
    </div>
  )
}
