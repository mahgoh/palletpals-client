import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { parseDateTime, formatPrice } from '@/utils/common'

export default function OrderItem({ order, className }) {
  const { t, i18n } = useTranslation()

  if (!order) return null

  const { id, totalCost, dateOrdered, dateDelivered, productItems } = order

  const numProducts = productItems.length

  return (
    <div className={className}>
      <NavLink to={`/order/${id}`}>
        <h3 className="mb-2 text-xl font-medium hover:underline focus:underline">
          {t('common.order.title', { numOrders: 1 })} #{id}
        </h3>
      </NavLink>
      <div className="flex justify-between">
        <div>
          <div>
            {t('common.order.ordered')}:{' '}
            {parseDateTime(dateOrdered, i18n.language)}
          </div>
          {dateDelivered !== null && (
            <div>
              {t('common.order.delivered')}:{' '}
              {parseDateTime(dateDelivered, i18n.language)}
            </div>
          )}
          {dateDelivered === null && (
            <div>
              {t('common.order.delivered')}:{' '}
              <strong>{t('common.order.pending')}</strong>
            </div>
          )}
          <div>
            {numProducts} {t('common.product', { numProducts })}
          </div>
        </div>
        <div>
          <div className="mb-4 text-right text-xl font-bold">
            {formatPrice(totalCost)}
          </div>
        </div>
      </div>
    </div>
  )
}

OrderItem.propTypes = {
  order: PropTypes.object,
}
