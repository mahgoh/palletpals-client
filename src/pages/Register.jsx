import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import { User } from '@/services/api'
import { useNotification } from '@/services/notification'
import Button, { LinkButton } from '@/components/Button'
import Form from '@/components/Form'
import Main from '@/components/Main'
import Pagetitle from '@/components/Pagetitle'
import Spacer from '@/components/Spacer'
import Subheading from '@/components/Subheading'
import TextField from '@/components/TextField'

export default function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { showNotification } = useNotification()

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
      firstName: '',
      lastName: '',
      street: '',
      premise: '',
      city: '',
      postalCode: '',
      country: '',
      email: '',
      password: '',
      accessCode: '',
    },
    validate,
    onSubmit: (values) => {
      const payload = {
        userName: values.firstName + ' ' + values.lastName,
        address: {
          firstName: values.firstName,
          lastName: values.lastName,
          street: values.street,
          premise: values.premise,
          city: values.city,
          postalCode: values.postalCode,
          country: values.country,
        },
        email: values.email,
        password: values.password,
        accessCode: values.accessCode,
      }

      User.register(payload, (success) => {
        if (success) {
          showNotification(t('message.registered'))
          navigate('/login')
        } else {
          showNotification(t('message.not-registered'))
        }
      })
    },
  })

  return (
    <Main>
      <Pagetitle title={t('common.auth.register')} />
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
        <div className="sm:col-span-2">
          <Spacer size="sm" />
          <Subheading title={t('common.profile.address')} />
        </div>
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
        <div className="sm:col-span-2">
          <Spacer size="sm" />
        </div>
        <TextField
          label={t('common.auth.accessCode')}
          error={
            formik.touched.accessCode && formik.errors.accessCode
              ? formik.errors.accessCode
              : null
          }
          {...formik.getFieldProps('accessCode')}
        />
        <div></div>
        <div className="flex space-x-2">
          <Button type="submit" disabled={!formik.isValid || formik.isDirty}>
            {t('common.auth.register')}
          </Button>
          <LinkButton to="/login" color="secondary">
            {t('common.auth.login')}
          </LinkButton>
        </div>
      </Form>
    </Main>
  )
}
