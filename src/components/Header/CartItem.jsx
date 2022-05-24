import { useTranslation } from 'react-i18next'

export default function CartItem({ cartItem }) {
  const { t } = useTranslation()

  const { product, pricePerUnit, quantity } = cartItem

  return (
    <div className="grid grid-cols-2 py-4 first:pt-0 last:pb-0">
      <div>
        <h3 className="pb-2 text-lg font-bold leading-10 tracking-tight sm:text-lg sm:leading-none">
          {product.name}
        </h3>
        <div>
          {t('common.amount')}: {quantity}
        </div>
      </div>
      <div className="text-right text-lg font-medium">
        CHF {(pricePerUnit * quantity).toFixed(2)}
      </div>
    </div>
  )
}
