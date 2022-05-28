import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { parseDateTime, formatPrice, formatOrderId } from '@/utils/common'

export default function OrderItem({ order }) {
  const { t, i18n } = useTranslation()

  if (!order) return null

  const { id, totalCost, dateOrdered, dateDelivered, productItems } = order

  const numProducts = productItems.length

  return (
    <div className="mb-4 last:mb-0">
      <NavLink
        to={`/order/${id}`}
        className="group block rounded-md ring-orange-500 ring-offset-2 ring-offset-transparent hover:ring-2  focus:outline-none focus:ring-2"
      >
        <div className="grid grid-cols-1 items-center gap-y-4 gap-x-6 rounded-md bg-gray-100 p-6 group-hover:bg-orange-500/10 group-focus:bg-orange-500/10 dark:bg-gray-800 sm:grid-cols-5">
          <div>
            <div className="font-semibold">{t('common.order.id')}</div>
            <h3 className="text-gray-500 dark:text-gray-400">
              {formatOrderId(id)}
            </h3>
          </div>
          <div>
            <div className="font-semibold">{t('common.order.ordered')}</div>
            <div className="text-gray-500 dark:text-gray-400">
              {parseDateTime(dateOrdered, i18n.language)}
            </div>
          </div>
          <div>
            <div className="font-semibold">{t('common.order.delivered')}</div>
            <div className="text-gray-500 dark:text-gray-400">
              {dateDelivered !== null
                ? parseDateTime(dateDelivered, i18n.language)
                : t('common.order.pending')}
            </div>
          </div>
          <div>
            <div className="font-semibold">
              {t('common.product', { numProducts: 2 })}
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              {numProducts}
            </div>
          </div>
          <div>
            <div className="text-right text-xl font-bold">
              {formatPrice(totalCost)}
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  )
}

OrderItem.propTypes = {
  order: PropTypes.object,
}
