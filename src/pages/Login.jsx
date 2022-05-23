import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/services/auth'
import { useFormik } from 'formik'
import Button, { LinkButton } from '@/components/Button'
import Form from '@/components/Form'
import Main from '@/components/Main'
import Pagetitle from '@/components/Pagetitle'
import Spacer from '@/components/Spacer'
import TextField from '@/components/TextField'

export default function Login() {
  const { t } = useTranslation()
  let navigate = useNavigate()
  let location = useLocation()
  let auth = useAuth()

  let from = location.state?.from?.pathname || '/'

  const validate = (values) => {
    const errors = {}
    if (!values.email) {
      errors.email = t('validation.required')
    }

    if (!values.password) {
      errors.password = t('validation.required')
    }

    return errors
  }

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
        <div className="flex space-x-2">
          <LinkButton to="/register" color="secondary" className="flex-1">
            {t('common.auth.register')}
          </LinkButton>
          <Button type="submit" className="flex-1">
            {t('common.auth.login')}
          </Button>
        </div>
      </Form>
    </Main>
  )
}
