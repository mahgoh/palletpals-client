import { useTranslation } from 'react-i18next'
import Debug from '@/components/Debug'
import Main from '@/components/Main'
import Pagetitle from '@/components/Pagetitle'
import ProductList from '@/components/ProductList'
import Spacer from '@/components/Spacer'

const products = [
  {
    id: 1,
    name: 'DeWalt Saw Machine',
    price: 249,
    image: '/images/dewalt.jpg',
  },
  {
    id: 2,
    name: 'Cover Suspension System',
    price: 89,
    image: '/images/suspension.jpg',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    price: 56.9,
    image: '/images/paper.jpg',
  },
  {
    id: 4,
    name: 'Machined Mechanical Steel',
    price: 194,
    image: '/images/steel.jpg',
  },
  {
    id: 5,
    name: 'CNC Mill',
    price: 99,
    image: '/images/cnc.jpg',
  },
]

export default function Products() {
  const { t } = useTranslation()
  return (
    <Main>
      <Pagetitle title={t('common.products')} />
      <Debug data={products} />
      <Spacer size="lg" />
      <ProductList products={products} />
    </Main>
  )
}
