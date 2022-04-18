import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { classNames } from '@/utils/common'

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
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}
