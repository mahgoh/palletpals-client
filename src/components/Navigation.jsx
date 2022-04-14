import NavigationLink from './NavigationLink'
import { useTranslation } from 'react-i18next'
import LanguageSelect from '@/components/LanguageSelect'
import AppearanceSelect from '@/components/AppearanceSelect'

export default function Navigation() {
  const { t } = useTranslation()

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

  return (
    <nav className="flex h-full items-center justify-end">
      {routes.map((route) => (
        <NavigationLink to={route.to} key={route.to} label={route.label} />
      ))}
      <div className="mr-4 flex space-x-2">
        <AppearanceSelect />
        <LanguageSelect />
      </div>
    </nav>
  )
}
