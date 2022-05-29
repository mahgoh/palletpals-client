import { Outlet } from 'react-router-dom'
import AdminNavigation from '@/components/AdminNavigation'

export default function Admin() {
  return (
    <>
      <AdminNavigation />
      <Outlet />
    </>
  )
}
