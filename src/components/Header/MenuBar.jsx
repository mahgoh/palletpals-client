import PropTypes from 'prop-types'
import Navigation from '@/components/Navigation'
import AppearanceSelect from './AppearanceSelect'
import LanguageSelect from './LanguageSelect'
import Cart from './Cart'
import Logout from './Logout'

export default function MenuBar({ routes }) {
  return (
    <div className="hidden justify-end sm:flex">
      <Navigation routes={routes} />
      <Cart />
      <div className="ml-4 flex items-center space-x-2">
        <AppearanceSelect className="w-28" />
        <LanguageSelect />
      </div>
    </div>
  )
}

MenuBar.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.exact({
      to: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
}
