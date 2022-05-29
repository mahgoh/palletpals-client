import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import API from '@/services/api'
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

export default function AdminWarehouses() {
  const { t } = useTranslation()

  const { data, loading, error } = API.Warehouse.all()

  function renderWarehouses() {
    if (!data) return null

    const head = (
      <TableHead>
        <TableHeadRow className="grid-cols-2">
          <TableCell>
            {t('common.warehouse.title', { numWarehouses: 1 })}
          </TableCell>
          <TableCell>{t('common.actions')}</TableCell>
        </TableHeadRow>
      </TableHead>
    )

    const cells = data.map((warehouse) => {
      const { id, name } = warehouse

      return (
        <TableRow className="grid-cols-2" key={id}>
          <TableCell key={id}>
            <NavLink to={`/admin/warehouses/${id}`}>
              <h4 className="mb-1 text-lg font-medium ">{name}</h4>
            </NavLink>
          </TableCell>
          <TableCell className="space-x-2">
            <LinkButton
              size="sm"
              to={`/admin/warehouses/${id}/edit`}
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
        <Pagetitle title={t('common.warehouse.title', { numWarehouses: 2 })}>
          <LinkButton to="/admin/warehouses/create">
            {t('common.create')}
          </LinkButton>
        </Pagetitle>
        <Spacer size="lg" />
        {loading && <Loader />}
        {renderWarehouses()}
      </Main>
    </>
  )
}
