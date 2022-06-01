import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import API from '@/services/api'
import { useCart } from '@/services/cart'
import { useNotification } from '@/services/notification'
import { parseDateTime, formatOrderId } from '@/utils/common'
import Button from '@/components/Button'
import Debug from '@/components/Debug'
import Loader from '@/components/Loader'
import Main from '@/components/Main'
import Pagetitle from '@/components/Pagetitle'
import ProductItem from '@/components/ProductItem'
import Subheading from '@/components/Subheading'
import Spacer from '@/components/Spacer'
import {
  FinancialTable,
  TableHead,
  TableBody,
  TableHeadRow,
  TableCell,
} from '@/components/Table'

export default function Order() {
  const { t, i18n } = useTranslation()
  const { orderId } = useParams()

  const { refreshCart } = useCart()
  const { showNotification } = useNotification()

  const { data, error, loading } = API.Order.byId(orderId)

  async function reOrder() {
    try {
      await API.Order.reOrder(orderId)
      refreshCart()
      showNotification(t('message.added-to-cart', { numProducts: 2 }))
    } catch (e) {
      showNotification(t('message.not-added-to-cart', { numProducts: 2 }))
      console.error(e)
    }
  }

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
        >
          <Button onClick={reOrder}>{t('common.order.re-order')}</Button>
        </Pagetitle>
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
        <TableHead>
          <TableHeadRow className="grid-cols-3 sm:grid-cols-5">
            <TableCell>
              {t('common.product.title', { numProducts: 1 })}
            </TableCell>
            <TableCell className="text-right sm:hidden">
              {t('common.product.price-per-unit')}
            </TableCell>
            <TableCell className="hidden sm:block">
              {t('common.product.pallet-space')}
            </TableCell>
            <TableCell className="hidden sm:block">
              {t('common.amount')}
            </TableCell>
            <TableCell className="hidden sm:block">
              {t('common.product.price-per-unit')}
            </TableCell>
            <TableCell className="text-right">
              {t('common.product.price')}
            </TableCell>
          </TableHeadRow>
        </TableHead>

        <TableBody>
          {productItems.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </TableBody>
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
