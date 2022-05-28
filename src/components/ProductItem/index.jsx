import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { formatPrice } from '@/utils/common'

export default function ProductItem({ product }) {
  const { i18n } = useTranslation()

  if (!product) return null

  const { name, pricePerUnit, quantity, palletSpace } = product

  return (
    <div className="mb-6 border-b border-gray-200 pb-6 last:mb-0 last:border-0 last:pb-0 dark:border-gray-700">
      <div className="grid grid-cols-3 sm:grid-cols-5">
        <h4 className="mb-1 text-lg font-medium ">{name}</h4>
        <div className="text-right sm:hidden">
          {quantity} x {formatPrice(pricePerUnit, i18n.language)}
        </div>
        <div className="hidden sm:block">{palletSpace}</div>
        <div className="hidden sm:block">{quantity}</div>
        <div className="hidden sm:block">
          {formatPrice(pricePerUnit, i18n.language)}
        </div>
        <div className="text-right">
          <strong>{formatPrice(pricePerUnit * quantity, i18n.language)}</strong>
        </div>
      </div>
    </div>
  )
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    pricePerUnit: PropTypes.number,
    quantity: PropTypes.number,
    palletSpace: PropTypes.number,
  }),
}
