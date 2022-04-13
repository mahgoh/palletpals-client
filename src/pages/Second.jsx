import Main from '@/components/Main'
import Pagetitle from '@/components/Pagetitle'
import { useTranslation } from 'react-i18next'

export default function Second() {
  const { t } = useTranslation()
  return (
    <Main>
      <Pagetitle>{t('common.second')}</Pagetitle>
    </Main>
  )
}
