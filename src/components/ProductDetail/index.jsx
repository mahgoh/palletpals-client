import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'
import { Disclosure, Tab } from '@headlessui/react'
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline'
import { classNames, formatPrice } from '@/utils/common'
import { useAuth } from '@/services/auth'
import { useCart } from '@/services/cart'
import { useNotification } from '@/services/notification'
import API from '@/services/api'
import Button from '@/components/Button'
import Table from '@/components/Table'
import TextField from '@/components/TextField'

export default function ProductDetail({ product }) {
  const { t, i18n } = useTranslation()
  const auth = useAuth()
  const { refreshCart } = useCart()
  const location = useLocation()
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const validate = (values) => {
    const errors = {}
    if (!values.amount) {
      errors.amount = t('validation.required')
    } else if (values.amount < 1) {
      errors.amount = t('validation.min', { min: 1 })
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      amount: 1,
    },
    validate,
    onSubmit: async (values) => {
      if (!auth.authenticated) {
        navigate('/login', { state: { from: location } })
      } else {
        try {
          await API.Cart.add(product.id, values.amount)
          await refreshCart()
          showNotification(t('message.added-to-cart'))
        } catch (e) {
          showNotification(t('message.not-added-to-cart'))
          console.error(e)
        }
      }
    },
  })

  if (!product || Object.keys(product).length === 0) {
    return null
  }

  const {
    name,
    details,
    description,
    price,
    productImages,
    maxProducts,
    minPalletSpace,
  } = product

  const detailRows = [
    {
      key: t('common.product.max-products'),
      value: maxProducts,
    },
    {
      key: t('common.product.min-pallet-space'),
      value: minPalletSpace,
    },
  ]

  const i18nDescription = () => {
    if (
      i18n.language !== 'en' &&
      product['description_' + i18n.language] !== null
    )
      return product['description_' + i18n.language]

    return description
  }

  const i18nDetails = () => {
    if (i18n.language !== 'en' && product['details_' + i18n.language] !== null)
      return product['details_' + i18n.language]

    return details
  }

  return (
    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
      {/* Image gallery */}
      <Tab.Group as="div" className="flex flex-col-reverse">
        {/* Image selector */}
        <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
          <Tab.List className="grid grid-cols-4 gap-6">
            {productImages.map((image, i) => (
              <Tab
                key={i}
                className="relative flex h-24 cursor-pointer items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
              >
                {({ selected }) => (
                  <>
                    <span className="absolute inset-0 overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="h-full w-full object-cover object-center"
                      />
                    </span>
                    <span
                      className={classNames(
                        selected ? 'ring-orange-500' : 'ring-transparent',
                        'pointer-events-none absolute inset-0 ring-2 ring-offset-2 dark:ring-offset-gray-900'
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </Tab>
            ))}
          </Tab.List>
        </div>

        <Tab.Panels className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          {productImages.map((image, i) => (
            <Tab.Panel key={i}>
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover object-center"
              />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

      {/* Product info */}
      <div className="mt-10 sm:mt-16 lg:mt-0">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          {name}
        </h1>

        <div className="mt-3">
          <h2 className="sr-only">{t('common.product-information')}</h2>
          <p className="text-3xl">{formatPrice(price)}</p>
        </div>

        <div className="mt-6">
          <h3 className="sr-only">{t('common.product.description')}</h3>

          <div className="space-y-6 text-base text-gray-700 dark:text-gray-300">
            {i18nDescription()}
          </div>
        </div>

        <form className="mt-6" onSubmit={formik.handleSubmit}>
          <div className="mt-10 flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <TextField
              type="number"
              placeholder={t('common.amount')}
              className="w-auto text-center"
              showError={false}
              min={1}
              error={
                formik.touched.amount && formik.errors.amount
                  ? formik.errors.amount
                  : null
              }
              {...formik.getFieldProps('amount')}
            />
            <Button type="submit" className="w-full grow sm:max-w-xs">
              {t('common.cart.add')}
            </Button>
          </div>
        </form>

        <section aria-labelledby="details-heading" className="mt-8">
          <h2 id="details-heading" className="sr-only">
            {t('common.product.details')}
          </h2>

          <div className="divide-y divide-gray-200 border-t border-gray-200 dark:divide-gray-700 dark:border-gray-700">
            <Disclosure as="div" defaultOpen="true">
              {({ open }) => (
                <>
                  <h3>
                    <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                      <span
                        className={classNames(
                          open
                            ? 'text-orange-400'
                            : 'text-gray-900 dark:text-white',
                          'text-sm font-medium'
                        )}
                      >
                        {t('common.product.details')}
                      </span>
                      <span className="ml-6 flex items-center">
                        {open ? (
                          <MinusSmIcon
                            className="block h-6 w-6 text-orange-400 group-hover:text-orange-500"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlusSmIcon
                            className="block h-6 w-6 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-white"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </h3>
                  <Disclosure.Panel
                    as="div"
                    className="pb-6 text-gray-700 dark:text-gray-200"
                  >
                    <div>{i18nDetails()}</div>
                    <div className="mt-4 flex space-x-2">
                      <Table rows={detailRows} />
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </section>
      </div>
    </div>
  )
}

ProductDetail.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    maxProducts: PropTypes.number.isRequired,
    minPalletSpace: PropTypes.number.isRequired,
    productImages: PropTypes.arrayOf(
      PropTypes.exact({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
}
