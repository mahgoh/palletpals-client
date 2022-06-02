import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import API from '@/services/api'
import { useNotification } from '@/services/notification'
import Button from '@/components/Button'
import Form from '@/components/Form'
import Main from '@/components/Main'
import Pagetitle from '@/components/Pagetitle'
import Spacer from '@/components/Spacer'
import Subheading from '@/components/Subheading'
import TextField from '@/components/TextField'

export default function AdminWarehouseCreate() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const validate = (values) => {
    const errors = {}

    if (!values.name) {
      errors.name = t('validation.required')
    }
    if (!values.organisationName) {
      errors.organisationName = t('validation.required')
    }

    if (!values.street) {
      errors.street = t('validation.required')
    }

    if (!values.city) {
      errors.city = t('validation.required')
    }

    if (!values.postalCode) {
      errors.postalCode = t('validation.required')
    }

    if (!values.country) {
      errors.country = t('validation.required')
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      organisationName: '',
      street: '',
      city: '',
      postalCode: '',
      country: '',
    },
    validate,
    onSubmit: async (values) => {
      try {
        const payload = {
          name: values.name,
          address: {
            organisationName: values.organisationName,
            street: values.street,
            city: values.city,
            postalCode: values.postalCode,
            country: values.country,
          },
        }

        await API.Warehouse.create(payload)
        showNotification(t('message.warehouse-created'))
        navigate('/admin/warehouses')
      } catch (e) {
        showNotification(t('message.warehouse-not-created'))
        console.error(e)
      }
    },
  })

  function renderForm() {
    return (
      <Form onSubmit={formik.handleSubmit} twoColumns width="two-thirds">
        <div className="sm:col-span-2">
          <TextField
            label={t('common.name')}
            error={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : null
            }
            {...formik.getFieldProps('name')}
          />
        </div>
        <div className="sm:col-span-2">
          <Spacer size="sm" />
          <Subheading title="Address" />
        </div>

        <div className="sm:col-span-2">
          <TextField
            label={t('common.profile.organisationName')}
            error={
              formik.touched.organisationName && formik.errors.organisationName
                ? formik.errors.organisationName
                : null
            }
            {...formik.getFieldProps('organisationName')}
          />
        </div>
        <div className="sm:col-span-2">
          <TextField
            label={t('common.profile.street')}
            error={
              formik.touched.street && formik.errors.street
                ? formik.errors.street
                : null
            }
            {...formik.getFieldProps('street')}
          />
        </div>
        <TextField
          label={t('common.profile.postalCode')}
          error={
            formik.touched.postalCode && formik.errors.postalCode
              ? formik.errors.postalCode
              : null
          }
          {...formik.getFieldProps('postalCode')}
        />
        <TextField
          label={t('common.profile.city')}
          error={
            formik.touched.city && formik.errors.city
              ? formik.errors.city
              : null
          }
          {...formik.getFieldProps('city')}
        />
        <div className="sm:col-span-2">
          <TextField
            label={t('common.profile.country')}
            error={
              formik.touched.country && formik.errors.country
                ? formik.errors.country
                : null
            }
            {...formik.getFieldProps('country')}
          />
        </div>
        <Button type="submit" disabled={!formik.isValid || !formik.dirty}>
          {t('common.create')}
        </Button>
      </Form>
    )
  }

  return (
    <>
      <Main>
        <Pagetitle title={t('common.warehouse.create')} />
        <Spacer size="lg" />
        {renderForm()}
      </Main>
    </>
  )
}
