import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ShoppingCartIcon, XIcon } from '@heroicons/react/outline'
import { useAuth } from '@/services/auth'
import { useCart } from '@/services/cart'
import { classNames } from '@/utils/common'
import { LinkButton } from '@/components/Button'
import CartItem from './CartItem'

export default function Cart() {
  const { t } = useTranslation()
  const auth = useAuth()
  const { cart } = useCart()
  const [isOpen, setIsOpen] = useState(false)

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
          <LinkButton
            to="/login"
            className="mt-4 w-full"
            onClick={() => setIsOpen(false)}
          >
            {t('common.auth.login')}
          </LinkButton>
        </>
      )
    }

    if (cart.shoppingCart.length === 0) {
      return (
        <div className="inline-flex grow items-center justify-center">
          {t('common.cart.empty')}
        </div>
      )
    }

    return (
      <>
        <div className="w-full grow justify-start divide-y divide-gray-200 overflow-y-auto dark:divide-gray-700">
          {renderCartItems()}
        </div>
        <LinkButton
          to="/cart"
          className="mt-4 w-full"
          onClick={() => setIsOpen(false)}
        >
          {t('common.cart.go')}
        </LinkButton>
      </>
    )
  }

  return (
    <div className="group ml-4 flex items-center">
      <button type="button" onClick={() => setIsOpen(true)}>
        <ShoppingCartIcon
          className="h-5 w-5 cursor-pointer text-gray-600 transition-colors hover:text-orange-500 focus:text-orange-500 dark:text-gray-100 dark:hover:text-orange-500"
          aria-hidden="true"
        />
      </button>
      <div
        className={classNames(
          'fixed top-0 z-20 h-screen max-h-screen w-96 transition-all duration-300 ease-menu',
          isOpen ? 'right-0 opacity-100' : '-right-full opacity-0'
        )}
      >
        <div className="flex h-full w-full flex-col border-l border-gray-200 bg-white p-8 text-left dark:border-gray-700 dark:bg-gray-900">
          <h2 className="flex items-center justify-between pb-10 pt-4 text-2xl font-extrabold leading-10 tracking-tight sm:text-3xl sm:leading-none">
            <span>{t('common.cart.title')}</span>
            <span>
              <button
                type="button"
                className="text-gray-600 hover:text-orange-500 focus:text-orange-500 dark:text-gray-400 dark:hover:text-orange-500 dark:focus:text-orange-500"
                onClick={() => setIsOpen(false)}
              >
                <XIcon className="h-6 w-6" />
              </button>
            </span>
          </h2>
          {renderCart()}
        </div>
      </div>
    </div>
  )
}
