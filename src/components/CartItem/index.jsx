import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TrashIcon } from '@heroicons/react/outline'
import { useFormik } from 'formik'
import API from '@/services/api'
import { useCart } from '@/services/cart'
import { productImageURL } from '@/utils/common'
import Button from '@/components/Button'
import TextField from '@/components/TextField'

export default function CartItem({ item }) {
  const { t } = useTranslation()
  const { refreshCart } = useCart()

  if (!item) {
    return null
  }

  const { id, product, quantity, pricePerUnit } = item

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
      amount: quantity,
    },
    validate,
    onSubmit: async (values) => {
      try {
        await API.Cart.update(id, values.amount)
        await refreshCart()
        // TODO: Display success message
      } catch (e) {
        console.error(e)
      }
    },
  })

  async function removeItem() {
    try {
      await API.Cart.remove(id)
      await refreshCart()
      // TODO: Display success message
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="mb-4 flex flex-col last:mb-0 sm:flex-row">
      <div className="flex grow">
        <div className="h-32 w-32 overflow-hidden bg-gray-100 dark:bg-gray-800">
          {product.productImages.length > 0 && (
            <NavLink to={`/product/${product.id}`}>
              <img
                className="h-32 w-32 object-cover"
                src={productImageURL(product.productImages[0].id)}
                alt={product.name}
              />
            </NavLink>
          )}
        </div>
        <div className="flex flex-col py-2 px-6">
          <NavLink to={`/product/${product.id}`}>
            <h3 className="mb-2 text-lg font-bold hover:underline focus:underline">
              {product.name}
            </h3>
          </NavLink>
          <div>
            {t('common.price-per-unit')}: CHF {pricePerUnit.toFixed(2)}
          </div>
          <div>
            {t('common.amount')}: {quantity}
          </div>
          <div className="sm:mt-2">
            {t('common.total')}:{' '}
            <strong>CHF {(pricePerUnit * quantity).toFixed(2)}</strong>
          </div>
        </div>
      </div>
      <form
        className="mt-4 flex space-x-2 sm:mt-0 sm:flex-col sm:justify-end sm:space-x-0 sm:space-y-2"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          type="number"
          placeholder={t('common.amount')}
          className="w-auto grow text-center sm:grow-0"
          showError={false}
          min={1}
          error={
            formik.touched.amount && formik.errors.amount
              ? formik.errors.amount
              : null
          }
          {...formik.getFieldProps('amount')}
        />
        <Button type="submit">{t('common.update')}</Button>
      </form>
      <div className="flex flex-col justify-end pt-2 sm:pt-0 sm:pl-4">
        <Button
          className="inline-flex justify-center"
          color="redOutline"
          title={t('common.remove')}
          onClick={removeItem}
        >
          <TrashIcon className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
