import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/services/auth'

export default function Logout() {
  const auth = useAuth()
  const navigate = useNavigate()

  function logout() {
    auth.logout(() => navigate('/'))
  }

  logout()

  return null
}
