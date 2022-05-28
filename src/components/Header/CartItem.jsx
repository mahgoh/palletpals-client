import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { productImageURL, formatPrice } from '@/utils/common'

export default function CartItem({ cartItem }) {
  const { t } = useTranslation()

  const { product, pricePerUnit, quantity } = cartItem

  return (
    <div className="flex py-4 first:pt-0 last:pb-0">
      <div className="mr-4 h-12 w-12 overflow-hidden bg-gray-100 dark:bg-gray-800">
        {product.productImages.length > 0 && (
          <NavLink to={`/product/${product.id}`}>
            <img
              className="h-12 w-12 object-cover"
              src={productImageURL(product.productImages[0].id)}
              alt={product.name}
            />
          </NavLink>
        )}
      </div>
      <div className="grow">
        <NavLink to={`/product/${product.id}`}>
          <h3 className="pb-2 text-lg font-bold leading-10 tracking-tight hover:underline focus:underline sm:text-lg sm:leading-none">
            {product.name}
          </h3>
        </NavLink>
        <div>
          {t('common.amount')}: {quantity}
        </div>
      </div>
      <div className="text-right text-lg font-medium">
        {formatPrice(pricePerUnit * quantity)}
      </div>
    </div>
  )
}
