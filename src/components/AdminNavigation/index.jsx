import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/utils/common'

export default function AdminNavigation() {
  const { t } = useTranslation()

  function renderNavLink(path, label) {
    return (
      <NavLink
        key={path}
        to={path}
        className={({ isActive }) =>
          classNames(
            'mb-2 w-full -translate-x-3 rounded-md py-1 px-3 transition-colors last:mb-0 hover:bg-orange-500/10  hover:text-orange-600 focus:text-orange-600 sm:mr-2 sm:mb-0 sm:w-auto sm:last:mr-0',
            isActive ? 'bg-transparent font-bold text-orange-600' : ''
          )
        }
      >
        {t(label)}
      </NavLink>
    )
  }
  function renderNavLinks() {
    const links = [
      {
        path: '/admin/products',
        label: t('common.product.title', { numProducts: 2 }),
      },
      {
        path: '/admin/service-providers',
        label: t('common.service-provider.title', { numServiceProviders: 2 }),
      },
      {
        path: '/admin/warehouses',
        label: t('common.warehouse.title', { numWarehouses: 2 }),
      },
    ]

    return links.map((link) => renderNavLink(link.path, link.label))
  }

  return (
    <div className="border-b border-gray-200 py-4 dark:border-gray-700">
      <div className="mx-auto flex flex-col items-center px-4 sm:flex-row lg:max-w-6xl lg:px-10">
        {renderNavLinks()}
      </div>
    </div>
  )
}
