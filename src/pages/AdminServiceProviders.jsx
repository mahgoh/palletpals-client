import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import API from '@/services/api'
import { useNotification } from '@/services/notification'
import { PencilIcon, TrashIcon } from '@heroicons/react/outline'
import Button, { LinkButton } from '@/components/Button'
import Debug from '@/components/Debug'
import Loader from '@/components/Loader'
import Main from '@/components/Main'
import Pagetitle from '@/components/Pagetitle'
import Spacer from '@/components/Spacer'
import {
  TableHead,
  TableBody,
  TableHeadRow,
  TableRow,
  TableCell,
} from '@/components/Table'

export default function AdminServiceProviders() {
  const { t } = useTranslation()
  const { showNotification } = useNotification()

  const { data, loading, error, load } = API.ServiceProvider.all()

  async function removeServiceProvider(e) {
    e.preventDefault()

    // currentTarget inseat of target to get button and not svg
    const id = e.currentTarget.dataset.id

    try {
      // Remove service provider
      await API.ServiceProvider.remove(id)

      // Show notification
      showNotification(t('message.service-provider-removed'))
    } catch (e) {
      showNotification(t('message.service-provider-not-removed'))
    }

    // Reload service providers
    load()
  }

  function renderServiceProviders() {
    if (!data) return null

    const head = (
      <TableHead>
        <TableHeadRow className="grid-cols-2">
          <TableCell>
            {t('common.service-provider.title', { numServiceProviders: 1 })}
          </TableCell>
          <TableCell>{t('common.actions')}</TableCell>
        </TableHeadRow>
      </TableHead>
    )

    const cells = data.map((serviceProvider) => {
      const { id, name } = serviceProvider

      return (
        <TableRow className="grid-cols-2" key={id}>
          <TableCell key={id}>
            <NavLink to={`/admin/service-providers/edit/${id}`}>
              <h4 className="mb-1 text-lg font-medium ">{name}</h4>
            </NavLink>
          </TableCell>
          <TableCell className="space-x-2">
            <LinkButton
              size="sm"
              to={`/admin/service-providers/edit/${id}`}
              className="inline-flex justify-center"
              title={t('common.edit')}
            >
              <PencilIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </LinkButton>
            <Button
              size="sm"
              color="redOutline"
              className="inline-flex justify-center"
              title={t('common.remove')}
              data-id={id}
              onClick={removeServiceProvider}
            >
              <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </TableCell>
        </TableRow>
      )
    })

    return (
      <>
        {head}
        <TableBody>{cells}</TableBody>
      </>
    )
  }

  return (
    <>
      <Debug data={{ data, error }} />
      <Main>
        <Pagetitle
          title={t('common.service-provider.title', { numServiceProviders: 2 })}
        >
          <LinkButton to="/admin/service-providers/create">
            {t('common.create')}
          </LinkButton>
        </Pagetitle>
        <Spacer size="lg" />
        {loading && <Loader />}
        {renderServiceProviders()}
      </Main>
    </>
  )
}
