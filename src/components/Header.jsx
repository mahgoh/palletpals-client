import { Link } from 'react-router-dom'
import Navigation from '@/components/Navigation'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 h-20 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto grid h-full grid-cols-2 px-4 lg:max-w-6xl lg:px-10">
        <Link
          to="/"
          className="inline-flex items-center  text-3xl font-extrabold tracking-tight "
        >
          <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
            PalletPals
          </span>
        </Link>
        <Navigation />
      </div>
    </header>
  )
}
