import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { formatPrice } from '@/utils/common'
import { TableRow, TableCell } from '@/components/Table'

export default function ProductItem({ product }) {
  const { i18n } = useTranslation()

  if (!product) return null

  const { name, pricePerUnit, quantity, palletSpace } = product

  return (
    <TableRow className="grid-cols-3 sm:grid-cols-5">
      <TableCell>
        <h4 className="mb-1 text-lg font-medium ">{name}</h4>
      </TableCell>
      <TableCell className="text-right sm:hidden">
        {quantity} x {formatPrice(pricePerUnit, i18n.language)}
      </TableCell>
      <TableCell className="hidden sm:block">{palletSpace}</TableCell>
      <TableCell className="hidden sm:block">{quantity}</TableCell>
      <TableCell className="hidden sm:block">
        {formatPrice(pricePerUnit, i18n.language)}
      </TableCell>
      <TableCell className="text-right">
        <strong>{formatPrice(pricePerUnit * quantity, i18n.language)}</strong>
      </TableCell>
    </TableRow>
  )
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    pricePerUnit: PropTypes.number,
    quantity: PropTypes.number,
    palletSpace: PropTypes.number,
  }),
}
