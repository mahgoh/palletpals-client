import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
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
  if (!values.username) {
    errors.username = 'Required'
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
      username: '',
      password: '',
    },
    validate,
    onSubmit: (values) => {
      auth.signin(values, () => {
        navigate(from, { replace: true })
      })
    },
  })

  return (
    <Main>
      <Pagetitle title={t('common.auth.login')} />
      <Form onSubmit={formik.handleSubmit} width="xs">
        <TextField
          name="username"
          label={t('common.auth.username')}
          error={
            formik.touched.username && formik.errors.username
              ? formik.errors.username
              : null
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        <Spacer />
        <TextField
          name="password"
          type="password"
          label={t('common.auth.password')}
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : null
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <Spacer />
        <Button type="submit">{t('common.auth.login')}</Button>
      </Form>
    </Main>
  )
}
