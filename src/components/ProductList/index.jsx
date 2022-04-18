import PropTypes from 'prop-types'
import Grid from '@/components/Grid'
import ProductListItem from '@/components/ProductListItem'

export default function ProductList({ products }) {
  if (!products) {
    return null
  }

  return (
    <Grid>
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </Grid>
  )
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string,
    })
  ).isRequired,
}
