import { useTranslation } from 'react-i18next'
import { LinkButton } from '@/components/Button'
import Main from '@/components/Main'
import Pagetitle from '@/components/Pagetitle'
import Spacer from '@/components/Spacer'

export default function Warehouses() {
  const { t } = useTranslation()

  return (
    <Main>
      <Pagetitle
        title={t('common.service-provider.title', { numServiceProviders: 2 })}
      >
        <LinkButton to="/admin/service-providers/create">
          {t('common.create')}
        </LinkButton>
      </Pagetitle>
      <Spacer size="lg" />
      <div>List all service providers, allow to edit and delete</div>
    </Main>
  )
}
