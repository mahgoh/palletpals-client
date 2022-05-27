import { useTranslation } from 'react-i18next'
import { useAuth } from '@/services/auth'
import API from '@/services/api'
import Button from '@/components/Button'
import Debug from '@/components/Debug'
import Subheading from '@/components/Subheading'
import Loader from '@/components/Loader'
import Main from '@/components/Main'
import Pagetitle from '@/components/Pagetitle'
import Spacer from '@/components/Spacer'

export default function Profile() {
  const { t } = useTranslation()
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
  return (
    <>
      {profile.loading && <Loader />}
      {!profile.loading && (
        <Main>
          <Pagetitle title={t('common.profile.title')} />
          <Spacer size="lg" />
          <div className="grid grid-cols-3">
            {renderAddress()}
            {renderEmail()}
          </div>
          <Spacer size="sm" />
          {/* TODO: Add edit functionality */}
          <Button>{t('common.profile.edit')}</Button>
          <Debug data={{ auth, profile, orders }} />
        </Main>
      )}
    </>
  )
}
