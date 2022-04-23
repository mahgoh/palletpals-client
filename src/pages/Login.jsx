import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/services/auth'
import { useFormik } from 'formik'
import Button from '@/components/Button'
import Form from '@/components/Form'
import Main from '@/components/Main'
import Pagetitle from '@/components/Pagetitle'
import Spacer from '@/components/Spacer'
import TextField from '@/components/TextField'

const validate = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  }

  if (!values.password) {
    errors.password = 'Required'
  }

  return errors
}

export default function Login() {
  const { t } = useTranslation()
  let navigate = useNavigate()
  let location = useLocation()
  let auth = useAuth()

  let from = location.state?.from?.pathname || '/'

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values) => {
      auth.login(values, () => {
        navigate(from, { replace: true })
      })
    },
  })

  return (
    <Main>
      <Pagetitle title={t('common.auth.login')} />
      <Form onSubmit={formik.handleSubmit} width="xs">
        <TextField
          label={t('common.auth.email')}
          error={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : null
          }
          {...formik.getFieldProps('email')}
        />
        <Spacer />
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
        <Spacer />
        <Button type="submit">{t('common.auth.login')}</Button>
      </Form>
    </Main>
  )
}
