import { cloneElement } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { render } from '@testing-library/react'
import i18n from '../i18n'

import { AuthProvider } from '@/services/auth'
import { AppearanceProvider } from '@/services/appearance'
import { CartProvider } from '@/services/cart'
import { LanguageProvider } from '@/services/language'
import { NotificationProvider } from '@/services/notification'

/**
 * Render component with router wrapper and option for specifying the current route.
 *
 * @param {JSX} component
 * @param {Object} options
 * @returns
 */
const renderWithRouter = (component, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  return {
    ...render(component, { wrapper: BrowserRouter }),
  }
}

/**
 * Render component with router wrapper and i18next provider.
 * @param {JSX} component
 * @param {Object} options
 * @returns
 */
const renderWithRouterWithi18n = (component, options) => {
  const comp = cloneElement(component, {
    changeLanguage: (lng) => {
      i18n.changeLanguage(lng)
      rerender(<I18nextProvider i18n={i18n}>{comp}</I18nextProvider>)
    },
  })
  const defaultRender = renderWithRouter(
    <I18nextProvider i18n={i18n}>{comp}</I18nextProvider>,
    options
  )
  const { rerender } = defaultRender
  return defaultRender
}

const renderComplete = (component, options) => {
  return {
    ...renderWithRouterWithi18n(
      <AuthProvider>
        <AppearanceProvider>
          <LanguageProvider>
            <CartProvider>
              <NotificationProvider>{component}</NotificationProvider>
            </CartProvider>
          </LanguageProvider>
        </AppearanceProvider>
      </AuthProvider>,
      options
    ),
  }
}

/**
 * Render component with specified renderer
 *
 * @param {JSX} component
 * @param {Object} param1
 * @returns
 */
const customRender = (component, { renderer = 'default', ...args } = {}) => {
  switch (renderer) {
    case 'router':
      return renderWithRouter(component, { ...args })
    case 'router-i18n':
      return renderWithRouterWithi18n(component, { ...args })
    case 'complete':
      return renderComplete(component, { ...args })
    case 'default':
    default:
      return {
        ...render(component),
      }
  }
}

export * from '@testing-library/react'
// export { default as userEvent } from '@testing-library/user-event'
export { customRender as render }
