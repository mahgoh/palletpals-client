import { useTranslation } from 'react-i18next'
import { useAuth } from '@/services/auth'
import { User } from '@/services/api'
import Loader from '@/components/Loader'
import Main from '@/components/Main'
import Pagetitle from '@/components/Pagetitle'
import Debug from '@/components/Debug'

export default function Profile() {
  const { t } = useTranslation()
  const auth = useAuth()

  const { data, error, loading } = User.profile()
  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <Main>
          <Pagetitle title={t('common.profile')} />
          {!loading && <Debug data={{ auth, data, error }} />}
        </Main>
      )}
    </>
  )
}
