import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import API from '@/services/api'
import { useCart } from '@/services/cart'
import Button from '@/components/Button'
import CartItem from '@/components/CartItem'
import Debug from '@/components/Debug'
import Main from '@/components/Main'
import Pagetitle from '@/components/Pagetitle'
import Spacer from '@/components/Spacer'
import Subheading from '@/components/Subheading'
import { FinancialTable } from '@/components/Table'

export default function Cart() {
  const { t } = useTranslation()
  const { cart, refreshCart } = useCart()

  useEffect(() => {
    refreshCart()
  }, [])

  async function placeOrder() {
    try {
      await API.Cart.order()
      await refreshCart()
      // TODO: Show success message/page
    } catch (e) {
      console.error(e)
      // TODO: Disply error message
    }
  }

  function renderTotal() {
    if (cart.shoppingCart.length === 0) return null

    return (
      <>
        <Subheading title={t('common.cart.total')} />
        <Spacer size="md" />
        <FinancialTable
          rows={[
            {
              key: t('common.cart.subtotal'),
              value: cart.shoppingCart.reduce(
                (acc, item) => acc + item.pricePerUnit * item.quantity,
                0
              ),
            },
            {
              key: t('common.cart.shipping'),
              value: cart.shippingCost,
            },
            {
              key: t('common.cart.total'),
              value: cart.totalCost,
              bold: true,
            },
          ]}
        />
        <Spacer size="md" />
        <div className="flex justify-end">
          {/* TODO: Submit order */}
          <Button onClick={placeOrder}>{t('common.cart.order')}</Button>
        </div>
        <Spacer size="lg" />
      </>
    )
  }

  return (
    <Main>
      <Pagetitle title={t('common.cart.title')} />
      <Debug data={{ cart }} />
      <Spacer size="lg" />
      <Subheading title={t('common.product', { numProducts: 2 })} />
      <Spacer size="md" />
      {cart.shoppingCart.length > 0 && (
        <div>
          {cart.shoppingCart.map((item, i) => (
            <CartItem key={i} item={item} />
          ))}
        </div>
      )}
      {cart.shoppingCart.length === 0 && (
        <div className="text-center">{t('common.cart.empty')}</div>
      )}
      <Spacer size="lg" />
      {renderTotal()}
    </Main>
  )
}
