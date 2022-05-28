import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { formatPrice } from '@/utils/common'

export default function ProductListItem({ product }) {
  if (!product) {
    return null
  }

  return (
    <Link to={`/product/${product.id}`} className="group ">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100 dark:bg-gray-800 xl:aspect-w-7 xl:aspect-h-8">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        )}
      </div>
      <h3 className="mt-4 text-sm text-gray-700 dark:text-gray-300">
        {product.name}
      </h3>
      <p className="mt-1 text-lg font-medium text-gray-900 dark:text-gray-100">
        {formatPrice(product.price)}
      </p>
    </Link>
  )
}

ProductListItem.propTypes = {
  product: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
  }).isRequired,
}
