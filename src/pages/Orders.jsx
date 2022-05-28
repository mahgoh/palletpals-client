import { useTranslation } from 'react-i18next'
import API from '@/services/api'
import Debug from '@/components/Debug'
import Loader from '@/components/Loader'
import Main from '@/components/Main'
import OrderItem from '@/components/OrderItem'
import Pagetitle from '@/components/Pagetitle'
import Spacer from '@/components/Spacer'

export default function Orders() {
  const { t } = useTranslation()

  const { loading, error, data } = API.Order.all()

  function renderOrders() {
    if (!data) return null

    return (
      <div>
        {data.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    )
  }

  return (
    <>
      {!loading && <Debug data={{ data, error }} />}
      <Main>
        <Pagetitle title={t('common.order.title', { numOrders: 2 })} />
        <Spacer size="lg" />
        {loading && <Loader />}
        {!loading && renderOrders()}
        <Spacer size="lg" />
      </Main>
    </>
  )
}
