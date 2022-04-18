import { useTranslation } from 'react-i18next'
import { useAuth } from '@/services/auth'
import Main from '@/components/Main'
import Pagetitle from '@/components/Pagetitle'
import Debug from '@/components/Debug'

export default function Profile() {
  const { t } = useTranslation()
  const auth = useAuth()
  return (
    <Main>
      <Pagetitle title={t('common.profile.title')} />
      <Debug data={auth} />
    </Main>
  )
}
