import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/services/auth'
import API from '@/services/api'
import { parseDateTime, formatPrice } from '@/utils/common'
import { LinkButton } from '@/components/Button'
import Debug from '@/components/Debug'
import Subheading from '@/components/Subheading'
import Loader from '@/components/Loader'
import Main from '@/components/Main'
import Pagetitle from '@/components/Pagetitle'
import Spacer from '@/components/Spacer'

export default function Profile() {
  const { t, i18n } = useTranslation()
  const auth = useAuth()

  const profile = API.User.profile()
  const orders = API.Order.all()

  function renderAddress() {
    if (!profile.data?.address) return null

    const {
      firstName,
      lastName,
      organisationName,
      street,
      premise,
      city,
      postalCode,
      country,
    } = profile.data.address

    return (
      <div className="col-span-2">
        <Subheading title={t('common.profile.address')} />
        <Spacer size="md" />
        <div>
          {firstName} {lastName}
        </div>
        {organisationName !== null && <div>{organisationName}</div>}
        <div>{street}</div>
        {premise !== null && <div>{premise}</div>}
        <div>
          {postalCode} {city}
        </div>
        <div>{country}</div>
      </div>
    )
  }

  function renderEmail() {
    if (!profile.data?.email) return null

    return (
      <div>
        <Subheading title={t('common.auth.email')} />
        <Spacer size="md" />
        <div>{profile.data.email}</div>
      </div>
    )
  }

  function renderOrders() {
    if (!orders.data) return null

    if (orders.data.length === 0) {
      return (
        <>
          <Subheading title={t('common.order.title', { numOrders: 2 })} />
          <Spacer size="md" />
          <div>{t('common.order.none')}</div>
        </>
      )
    }

    const latestOrders = orders.data[0]

    const { id, totalCost, dateOrdered, dateDelivered, productItems } =
      latestOrders

    const numProducts = productItems.length

    return (
      <>
        <Subheading title={t('common.order.title', { numOrders: 2 })}>
          <LinkButton to="/orders">{t('common.order.all')}</LinkButton>
        </Subheading>
        <Spacer size="md" />
        <div>
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
      </>
    )
  }

  return (
    <>
      {!profile.loading && !orders.loading && (
        <Debug data={{ auth, profile, orders }} />
      )}
      <Main>
        <Pagetitle title={t('common.profile.title')}>
          <LinkButton to="/profile/edit">{t('common.profile.edit')}</LinkButton>
        </Pagetitle>
        <Spacer size="lg" />
        {profile.loading && <Loader />}
        {!profile.loading && (
          <div className="grid grid-cols-3">
            {renderAddress()}
            {renderEmail()}
          </div>
        )}
        <Spacer size="lg" />
        {orders.loading && <Loader />}
        {!orders.loading && renderOrders()}
        <Spacer size="lg" />
      </Main>
    </>
  )
}
