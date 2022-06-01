import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { classNames } from '@/utils/common'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Spacer from '@/components/Spacer'
import AppearanceSelect from './AppearanceSelect'
import LanguageSelect from './LanguageSelect'

export default function MenuBarMobile({ routes }) {
  const [isOpen, setIsOpen] = useState(false)

  function renderCount(count) {
    if (!count || count === 0) return null

    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-orange-500/10 text-sm font-semibold text-orange-500">
        {count}
      </span>
    )
  }

  function renderMenu() {
    return (
      <div
        className={classNames(
          'fixed bottom-0 right-0 z-20 h-screen w-full bg-transparent bg-white transition-all duration-300 ease-menu dark:bg-gray-900',
          isOpen
            ? 'bottom-0 scale-100 opacity-100'
            : '-bottom-full scale-150 opacity-0'
        )}
      >
        <div className="mx-auto flex h-20 justify-end px-4">
          <button
            type="button"
            className="px-4"
            onClick={() => setIsOpen(false)}
          >
            <XIcon className="h-8 w-8" />
          </button>
        </div>
        <div className="flex flex-col items-start space-y-2 p-8 text-lg">
          {routes.map((route) => (
            <NavLink
              to={route.to}
              key={route.to}
              className={({ isActive }) => {
                return classNames(
                  'flex w-full items-center justify-between py-2',
                  isActive && 'font-bold text-orange-500'
                )
              }}
              onClick={() => {
                setIsOpen(false)
              }}
            >
              <span>{route.label}</span>
              {renderCount(route?.count)}
            </NavLink>
          ))}
          <Spacer size="sm" />
          <AppearanceSelect className="w-full" />
          <LanguageSelect className="w-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-end sm:hidden">
      <button type="button" className="px-4" onClick={() => setIsOpen(true)}>
        <MenuIcon className="h-8 w-8" />
      </button>
      {renderMenu()}
    </div>
  )
}

MenuBarMobile.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.exact({
      to: PropTypes.string,
      label: PropTypes.string,
      count: PropTypes.number,
    })
  ).isRequired,
}
