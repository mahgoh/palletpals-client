import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/services/auth'
import { LogoutIcon } from '@heroicons/react/outline'

export default function Logout() {
  const { t } = useTranslation()
  const auth = useAuth()
  const navigate = useNavigate()

  function logout() {
    auth.logout(() => navigate('/'))
  }

  if (auth.authenticated) {
    return (
      <button className="ml-4" title={t('common.auth.logout')} onClick={logout}>
        <LogoutIcon
          className="h-5 w-5 text-gray-600 transition-colors hover:text-orange-500 focus:text-orange-500 dark:text-gray-100 dark:hover:text-orange-500"
          aria-hidden="true"
        />
      </button>
    )
  } else {
    return null
  }
}
