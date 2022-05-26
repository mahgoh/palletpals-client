import { useTranslation } from 'react-i18next'
import { Product } from '@/services/api'
import Debug from '@/components/Debug'
import Loader from '@/components/Loader'
import Main from '@/components/Main'
import Pagetitle from '@/components/Pagetitle'
import ProductList from '@/components/ProductList'
import Spacer from '@/components/Spacer'

export default function Products() {
  const { t } = useTranslation()
  const { products, error, loading } = Product.all()

  return (
    <Main>
      <Pagetitle title={t('common.product', { numProducts: 2 })} />
      <Debug data={{ products, error }} />
      <Spacer size="lg" />
      {loading && <Loader />}
      {!loading && <ProductList products={products} />}
    </Main>
  )
}
