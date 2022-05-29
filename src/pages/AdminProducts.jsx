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

export default function AdminProducts() {
  const { t } = useTranslation()

  const { products, loading, error } = API.Product.all()

  function renderProducts() {
    if (!products) return null

    const head = (
      <TableHead>
        <TableHeadRow className="grid-cols-2">
          <TableCell>{t('common.product.title', { numProducts: 1 })}</TableCell>
          <TableCell>{t('common.actions')}</TableCell>
        </TableHeadRow>
      </TableHead>
    )

    const cells = products.map((product) => {
      const { id, name } = product

      return (
        <TableRow className="grid-cols-2" key={id}>
          <TableCell key={id}>
            <NavLink to={`/admin/products/${id}`}>
              <h4 className="mb-1 text-lg font-medium ">{name}</h4>
            </NavLink>
          </TableCell>
          <TableCell className="space-x-2">
            <LinkButton
              size="sm"
              to={`/admin/products/${id}/edit`}
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
      <Debug data={{ products, error }} />
      <Main>
        <Pagetitle title={t('common.product.title', { numProducts: 2 })}>
          <LinkButton to="/admin/products/create">
            {t('common.create')}
          </LinkButton>
        </Pagetitle>
        <Spacer size="lg" />
        {loading && <Loader />}
        {renderProducts()}
      </Main>
    </>
  )
}
