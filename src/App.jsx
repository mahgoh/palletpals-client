import { Outlet } from 'react-router-dom'
import Header from './components/Header'

function App() {
  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-gray-100">
      <Header />
      <Outlet />
    </div>
  )
}

export default App
