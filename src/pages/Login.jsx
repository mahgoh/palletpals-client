import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import { useAuth } from '@/services/auth'
import { useAppearance } from '@/services/appearance'
import { useLanguage } from '@/services/language'
import { useNotification } from '@/services/notification'
import Button, { LinkButton } from '@/components/Button'
import Form from '@/components/Form'
import Loader from '@/components/Loader'
import Main from '@/components/Main'
import Pagetitle from '@/components/Pagetitle'
import Spacer from '@/components/Spacer'
import TextField from '@/components/TextField'

export default function Login() {
  const { t } = useTranslation()
  let navigate = useNavigate()
  let location = useLocation()
  let auth = useAuth()
  let { setAppearance } = useAppearance()
  let { setLanguage } = useLanguage()
  let { showNotification } = useNotification()
  let [validating, setValidating] = useState(false)

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
      remember: false,
    },
    validate,
    onSubmit: (values) => {
      setValidating(true)
      auth.login(values, async (authenticated, userSettings) => {
        if (authenticated) {
          const { appearance, language } = userSettings
          setValidating(false)
          setAppearance(appearance)
          setLanguage(language)

          navigate(from, { replace: true })
        } else {
          setValidating(false)
          showNotification(t('message.login-failed'))
        }
      })
    },
  })

  return (
    <Main center>
      <Pagetitle title={t('common.auth.login')} />
      {validating && <Loader />}
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
        <div className="relative flex items-start">
          <div className="flex h-5 items-center">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 dark:border-gray-700 dark:bg-gray-900"
              {...formik.getFieldProps('remember')}
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="remember"
              className="font-medium text-gray-700 dark:text-gray-300"
            >
              {t('common.auth.remember')}
            </label>
          </div>
        </div>
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
