import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import API from '@/services/api'
import { parseDateTime, formatOrderId } from '@/utils/common'
import Debug from '@/components/Debug'
import Loader from '@/components/Loader'
import Main from '@/components/Main'
import Pagetitle from '@/components/Pagetitle'
import ProductItem from '@/components/ProductItem'
import Subheading from '@/components/Subheading'
import Spacer from '@/components/Spacer'
import { FinancialTable } from '@/components/Table'

export default function Order() {
  const { t, i18n } = useTranslation()
  const { orderId } = useParams()

  const { data, error, loading } = API.Order.byId(orderId)

  function render() {
    if (data === null) return null

    const { id, dateOrdered, dateDelivered, productItems } = data

    const numProducts = productItems.length

    return (
      <>
        <Pagetitle
          title={`${t('common.order.title', { numOrders: 1 })} #${formatOrderId(
            id
          )}`}
        />
        <Spacer size="lg" />
        <div className="grid grid-cols-1 gap-y-4 gap-x-6 rounded-md bg-gray-100 p-6 dark:bg-gray-800 sm:grid-cols-4">
          <div>
            <div className="font-semibold">{t('common.order.id')}</div>
            <div className="text-gray-500 dark:text-gray-400">
              {formatOrderId(id)}
            </div>
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
              {t('common.product.title', { numProducts: 2 })}
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              {numProducts}
            </div>
          </div>
        </div>
      </>
    )
  }

  function renderProducts() {
    if (data === null) return null

    const { productItems } = data

    return (
      <>
        <Spacer size="lg" />
        <Subheading title={t('common.product.title', { numProducts: 2 })} />
        <Spacer size="md" />
        <div className="mb-6 grid grid-cols-3 border-b border-gray-200 pb-3 text-gray-500 dark:border-gray-700 dark:text-gray-400 sm:grid-cols-5">
          <div>{t('common.product.title', { numProducts: 1 })}</div>
          <div className="text-right sm:hidden">
            {t('common.price-per-unit')}
          </div>
          <div className="hidden sm:block">{t('common.pallet-space')}</div>
          <div className="hidden sm:block">{t('common.amount')}</div>
          <div className="hidden sm:block">{t('common.price-per-unit')}</div>
          <div className="text-right">{t('common.price')}</div>
        </div>
        {productItems.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </>
    )
  }

  function renderTotal() {
    if (data === null) return null

    const { totalCost, productItems, shippingItem } = data

    return (
      <>
        <Spacer size="lg" />
        <Subheading title={t('common.cart.total')} />
        <Spacer size="md" />
        <FinancialTable
          rows={[
            {
              key: t('common.cart.subtotal'),
              value: productItems.reduce(
                (acc, item) => acc + item.pricePerUnit * item.quantity,
                0
              ),
            },
            {
              key: t('common.cart.shipping'),
              value: shippingItem.shippingCost,
            },
            {
              key: t('common.cart.total'),
              value: totalCost,
              bold: true,
            },
          ]}
        />
      </>
    )
  }

  return (
    <>
      {!loading && <Debug data={{ data, error }} />}
      <Main>
        {loading && <Loader />}
        {render()}
        {renderProducts()}
        {renderTotal()}
        <Spacer size="lg" />
      </Main>
    </>
  )
}
