import NavigationLink from './NavigationLink'
import { useTranslation } from 'react-i18next'
import { t } from 'i18next'

export default function Navigation() {
  const { t, i18n } = useTranslation()

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
    i18n.changeLanguage(e.target.dataset.lang)
  }
  return (
    <nav className="flex h-full justify-end">
      {routes.map((route) => (
        <NavigationLink
          to={route.to}
          key={route.to}
          label={route.label}
        ></NavigationLink>
      ))}
      <button
        onClick={changeLanguage}
        data-lang="en"
        className={i18n.language == 'en' ? 'pr-2 font-bold ' : 'pr-2'}
      >
        EN
      </button>
      <button
        onClick={changeLanguage}
        data-lang="de"
        className={i18n.language == 'de' ? 'font-bold' : ''}
      >
        DE
      </button>
    </nav>
  )
}
