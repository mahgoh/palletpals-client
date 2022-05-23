import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import { Disclosure, Tab } from '@headlessui/react'
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline'
import { classNames } from '@/utils/common'
import Button from '@/components/Button'
import TextField from '@/components/TextField'

export default function ProductDetail({ product }) {
  const { t } = useTranslation()

  const validate = (values) => {
    const errors = {}
    if (!values.amount) {
      errors.amount = t('validation.required')
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      amount: 1,
    },
    validate,
    onSubmit: (values) => {
      console.log(values)
    },
  })
  if (!product || Object.keys(product).length === 0) {
    return null
  }

  const {
    id,
    name,
    details,
    description,
    price,
    maxProducts,
    minPalletSpace,
    productImages,
  } = product

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

        <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
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
      <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          {name}
        </h1>

        <div className="mt-3">
          <h2 className="sr-only">{t('common.product-information')}</h2>
          <p className="text-3xl">CHF {price.toFixed(2)}</p>
        </div>

        <div className="mt-6">
          <h3 className="sr-only">{t('common.description')}</h3>

          <div className="space-y-6 text-base text-gray-700 dark:text-gray-300">
            {description}
          </div>
        </div>

        <form className="mt-6">
          <div className="mt-10 flex space-x-2">
            <TextField
              type="number"
              placeholder="Amount"
              className="w-auto text-center"
              showError={false}
              error={
                formik.touched.amount && formik.errors.amount
                  ? formik.errors.amount
                  : null
              }
              {...formik.getFieldProps('amount')}
            />
            <Button type="submit" className="max-w-xs flex-grow">
              {t('common.add-to-cart')}
            </Button>
          </div>
        </form>

        <section aria-labelledby="details-heading" className="mt-8">
          <h2 id="details-heading" className="sr-only">
            {t('common.details')}
          </h2>

          <div className="divide-y divide-gray-200 border-t border-gray-200 dark:divide-gray-700 dark:border-gray-700">
            <Disclosure as="div">
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
                        {t('common.details')}
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
                    <div>{details}</div>
                    <div className="mt-4 flex space-x-2">
                      <div className="rounded-md border p-4">
                        <strong>{maxProducts}</strong> products per pallet space
                      </div>
                      <div className="rounded-md border p-4">
                        <strong>{minPalletSpace}</strong> pallet space minimum
                      </div>
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
