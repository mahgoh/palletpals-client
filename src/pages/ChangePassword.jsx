import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import API from '@/services/api'
import { useAuth } from '@/services/auth'
import { useNotification } from '@/services/notification'
import Button from '@/components/Button'
import Form from '@/components/Form'
import Main from '@/components/Main'
import Pagetitle from '@/components/Pagetitle'
import TextField from '@/components/TextField'

export default function ProfileEdit() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const auth = useAuth()
  const { showNotification } = useNotification()

  const validate = (values) => {
    const errors = {}
    if (!values.currentPassword) {
      errors.currentPassword = t('validation.required')
    }

    if (!values.newPassword) {
      errors.newPassword = t('validation.required')
    } else if (values.currentPassword === values.newPassword) {
      errors.newPassword = t('validation.passwords-not-different')
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
    },
    validate,
    onSubmit: async (values) => {
      try {
        await API.User.patchPassword(values.currentPassword, values.newPassword)
        showNotification(t('message.password-updated'))

        // force logout user
        showNotification(t('message.login-with-new-password'))
        auth.logout(() => navigate('/login'))
      } catch (e) {
        showNotification(t('message.password-not-updated'))
        console.error(e)
      }
    },
  })

  function renderForm() {
    return (
      <Form onSubmit={formik.handleSubmit} width="two-thirds" twoColumns>
        <TextField
          type="password"
          label={t('common.profile.current-password')}
          error={
            formik.touched.currentPassword && formik.errors.currentPassword
              ? formik.errors.currentPassword
              : null
          }
          {...formik.getFieldProps('currentPassword')}
        />
        <TextField
          type="password"
          label={t('common.profile.new-password')}
          error={
            formik.touched.newPassword && formik.errors.newPassword
              ? formik.errors.newPassword
              : null
          }
          {...formik.getFieldProps('newPassword')}
        />

        <Button type="submit" disabled={!formik.isValid || !formik.dirty}>
          {t('common.save')}
        </Button>
      </Form>
    )
  }

  return (
    <Main>
      <Pagetitle title={t('common.profile.change-password')} />
      {renderForm()}
    </Main>
  )
}
