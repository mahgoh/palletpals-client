import { useNavigate, useParams } from 'react-router-dom'
import API from '@/services/api'
import Debug from '@/components/Debug'
import Loader from '@/components/Loader'
import Main from '@/components/Main'
import ProductDetail from '@/components/ProductDetail'

export default function Product() {
  const { productId } = useParams()
  const navigate = useNavigate()

  const { product, error, loading } = API.Product.byId(productId)

  // redirect if product does not exist
  if (error !== null) {
    navigate('/products')
  }

  return (
    <>
      <Debug data={{ product, error }} />
      <Main>
        {loading && <Loader />}
        {!loading && product && <ProductDetail product={product} />}
      </Main>
    </>
  )
}
