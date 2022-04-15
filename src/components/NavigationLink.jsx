import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavigationLink({ to, label }) {
  return (
    <NavLink
      className={({ isActive }) => {
        return classNames(
          'inline-flex items-center pr-6 last:pr-0',
          isActive ? 'font-semibold text-orange-500' : ''
        )
      }}
      to={to}
    >
      {label}
    </NavLink>
  )
}

NavigationLink.propTypes = {
  to: PropTypes.string,
  label: PropTypes.string,
}
