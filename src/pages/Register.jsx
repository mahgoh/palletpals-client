import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { User } from '@/services/api'
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

  const validate = (values) => {
    const errors = {}

    if (!values.userName) {
      errors.userName = t('validation.required')
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
      userName: '',
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values) => {
      User.register(values, () => {
        navigate('/login')
        // navigate(from, { replace: true })
      })
    },
  })

  return (
    <Main>
      <Pagetitle title={t('common.auth.register')} />
      <Form onSubmit={formik.handleSubmit} width="xs">
        <TextField
          label={t('common.auth.userName')}
          error={
            formik.touched.userName && formik.errors.userName
              ? formik.errors.userName
              : null
          }
          {...formik.getFieldProps('userName')}
        />
        <Spacer />
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
          <LinkButton to="/login" color="secondary">
            {t('common.auth.login')}
          </LinkButton>
          <Button type="submit">{t('common.auth.register')}</Button>
        </div>
      </Form>
    </Main>
  )
}
