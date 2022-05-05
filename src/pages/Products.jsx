import { useTranslation } from 'react-i18next'
import { Product } from '@/services/api'
import Debug from '@/components/Debug'
import Main from '@/components/Main'
import Pagetitle from '@/components/Pagetitle'
import ProductList from '@/components/ProductList'
import Spacer from '@/components/Spacer'

export default function Products() {
  const { t } = useTranslation()
  const { products, error, loading } = Product.all()

  return (
    <Main>
      <Pagetitle title={t('common.products')} />
      <Debug data={{ products, error }} />
      <Spacer size="lg" />
      {loading && <div>Loading...</div>}
      {!loading && <ProductList products={products} />}
    </Main>
  )
}
