import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/services/auth'

export default function Logout() {
  const { t } = useTranslation()
  const auth = useAuth()
  const navigate = useNavigate()

  function logout() {
    auth.signout(() => navigate('/'))
  }

  if (auth.user) {
    return (
      <button className="ml-4" onClick={logout}>
        {t('common.auth.logout')}
      </button>
    )
  } else {
    return null
  }
}
