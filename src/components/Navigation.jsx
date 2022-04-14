import NavigationLink from './NavigationLink'
import { useTranslation } from 'react-i18next'
import { useAppearance } from '@/services/appearance'
import LanguageSelect from '@/components/LanguageSelect'

export default function Navigation() {
  const { t } = useTranslation()
  const { appearance, setAppearance } = useAppearance()

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

  function changeAppearance(e) {
    e.preventDefault()
    setAppearance(e.target.dataset.appearance)
  }

  return (
    <nav className="flex h-full items-center justify-end">
      {routes.map((route) => (
        <NavigationLink to={route.to} key={route.to} label={route.label} />
      ))}
      <div className="mr-4 flex space-x-2">
        <button
          onClick={changeAppearance}
          data-appearance="light"
          className={appearance == 'light' ? 'font-bold ' : ''}
        >
          {t('common.appearance.light')}
        </button>
        <button
          onClick={changeAppearance}
          data-appearance="dark"
          className={appearance == 'dark' ? 'font-bold' : ''}
        >
          {t('common.appearance.dark')}
        </button>
        <button
          onClick={changeAppearance}
          data-appearance="media"
          className={appearance == 'media' ? 'font-bold' : ''}
        >
          {t('common.appearance.media')}
        </button>
      </div>
      <LanguageSelect />
    </nav>
  )
}
