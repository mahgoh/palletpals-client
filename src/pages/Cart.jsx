import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useCart } from '@/services/cart'
import CartItem from '@/components/CartItem'
import Debug from '@/components/Debug'
import Main from '@/components/Main'
import Pagetitle from '@/components/Pagetitle'
import Spacer from '@/components/Spacer'
import Subheading from '@/components/Subheading'
import { FinancialTable } from '@/components/Table'
import Button from '../components/Button'

export default function Cart() {
  const { t } = useTranslation()
  const { cart, refreshCart } = useCart()

  useEffect(() => {
    refreshCart()
  }, [])

  return (
    <Main>
      <Pagetitle title={t('common.cart')} />
      <Debug data={{ cart }} />
      <Spacer size="lg" />
      <Subheading title={t('common.product', { numProducts: 2 })} />
      <Spacer size="md" />
      <div>
        {cart.shoppingCart.map((item, i) => (
          <CartItem key={i} item={item} />
        ))}
      </div>
      <Spacer size="lg" />
      <Subheading title={t('common.total')} />
      <Spacer size="md" />
      <FinancialTable
        rows={[
          {
            key: t('common.subtotal'),
            value: cart.shoppingCart.reduce(
              (acc, item) => acc + item.pricePerUnit * item.quantity,
              0
            ),
          },
          {
            key: t('common.shipping'),
            value: cart.shippingCost,
          },
          {
            key: t('common.total'),
            value: cart.totalCost,
            bold: true,
          },
        ]}
      />
      <Spacer size="md" />
      <div className="flex justify-end">
        {/* TODO: Submit order */}
        <Button>{t('common.order-cart')}</Button>
      </div>
      <Spacer size="lg" />
    </Main>
  )
}
