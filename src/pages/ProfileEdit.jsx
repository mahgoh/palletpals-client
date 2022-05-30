import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import API from '@/services/api'
import { useNotification } from '@/services/notification'
import Button from '@/components/Button'
import Form from '@/components/Form'
import Main from '@/components/Main'
import Pagetitle from '@/components/Pagetitle'
import TextField from '@/components/TextField'

export default function ProfileEdit() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const { loading, error, data = {} } = API.User.profile()

  const validate = (values) => {
    const errors = {}
    if (!values.firstName) {
      errors.firstName = t('validation.required')
    }

    if (!values.lastName) {
      errors.lastName = t('validation.required')
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

    if (!values.email) {
      errors.email = t('validation.required')
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = t('validation.invalid.email')
    }

    if (!values.password) {
      errors.password = t('validation.required')
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      firstName: data?.address?.firstName,
      lastName: data?.address?.lastName,
      organisationName: data?.address?.organisationName,
      street: data?.address?.street,
      premise: data?.address?.premise,
      city: data?.address?.city,
      postalCode: data?.address?.postalCode,
      country: data?.address?.country,
      email: data?.email,
      password: '',
    },
    enableReinitialize: true,
    validate,
    onSubmit: async (values) => {
      try {
        await API.User.patch({
          address: {
            firstName: values.firstName,
            lastName: values.lastName,
            organisationName: values.organisationName,
            street: values.street,
            premise: values.premise,
            city: values.city,
            postalCode: values.postalCode,
            country: values.country,
          },
          email: values.email,
          ...(values.password &&
            values.password !== '' && { password: values.password }),
        })
        showNotification(t('message.profile-updated'))
        navigate('/profile')
      } catch (e) {
        showNotification(t('message.profile-not-updated'))
        console.error(e)
      }
    },
  })

  function renderForm() {
    if (loading || error !== null) return null

    return (
      <Form onSubmit={formik.handleSubmit} width="two-thirds" twoColumns>
        <TextField
          label={t('common.profile.firstName')}
          error={
            formik.touched.firstName && formik.errors.firstName
              ? formik.errors.firstName
              : null
          }
          {...formik.getFieldProps('firstName')}
        />
        <TextField
          label={t('common.profile.lastName')}
          error={
            formik.touched.lastName && formik.errors.lastName
              ? formik.errors.lastName
              : null
          }
          {...formik.getFieldProps('lastName')}
        />
        <TextField
          label={t('common.profile.organisationName')}
          error={
            formik.touched.organisationName && formik.errors.organisationName
              ? formik.errors.organisationName
              : null
          }
          {...formik.getFieldProps('organisationName')}
        />
        <div></div>
        <TextField
          label={t('common.profile.street')}
          error={
            formik.touched.street && formik.errors.street
              ? formik.errors.street
              : null
          }
          {...formik.getFieldProps('street')}
        />
        <TextField
          label={t('common.profile.premise')}
          error={
            formik.touched.premise && formik.errors.premise
              ? formik.errors.premise
              : null
          }
          {...formik.getFieldProps('premise')}
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
          label={t('common.profile.country')}
          error={
            formik.touched.country && formik.errors.country
              ? formik.errors.country
              : null
          }
          {...formik.getFieldProps('country')}
        />
        <div></div>
        <TextField
          label={t('common.auth.email')}
          error={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : null
          }
          {...formik.getFieldProps('email')}
        />
        <TextField
          type="password"
          label={t('common.auth.password')}
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : null
          }
          {...formik.getFieldProps('password')}
        />
        <Button type="submit">{t('common.save')}</Button>
      </Form>
    )
  }

  return (
    <Main>
      <Pagetitle title={t('common.profile.edit')} />
      {renderForm()}
    </Main>
  )
}
