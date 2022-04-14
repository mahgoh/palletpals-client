import NavigationLink from './NavigationLink'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '@/services/language'

export default function Navigation() {
  const { t } = useTranslation()
  const { language, setLanguage } = useLanguage()

  const routes = [
    {
      to: '/first',
      label: t('common.first'),
    },
    {
      to: '/second',
      label: t('common.second'),
    },
  ]

  function changeLanguage(e) {
    e.preventDefault()
    setLanguage(e.target.dataset.lang)
  }
  return (
    <nav className="flex h-full justify-end">
      {routes.map((route) => (
        <NavigationLink to={route.to} key={route.to} label={route.label} />
      ))}
      <div className="flex space-x-2">
      <button
        onClick={changeLanguage}
        data-lang="en"
          className={language == 'en' ? 'font-bold ' : ''}
      >
        EN
      </button>
      <button
        onClick={changeLanguage}
        data-lang="de"
          className={language == 'de' ? 'font-bold' : ''}
      >
        DE
      </button>
      </div>
    </nav>
  )
}
