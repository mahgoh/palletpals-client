import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import API from '@/services/api'
import { useCart } from '@/services/cart'
import { useNotification } from '@/services/notification'
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
  const { showNotification } = useNotification()
  const navigate = useNavigate()

  useEffect(() => {
    refreshCart()
  }, [])

  async function placeOrder() {
    try {
      const { id } = await API.Cart.order()
      await refreshCart()
      showNotification(t('message.order-placed'))
      navigate(`/order/${id}`)
    } catch (e) {
      showNotification(t('message.order-not-placed'))
      console.error(e)
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
          {cart.shoppingCart.map((item) => (
            <CartItem key={item.id} item={item} />
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
