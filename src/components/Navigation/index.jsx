import PropTypes from 'prop-types'
import NavigationLink from '@/components/NavigationLink'

export default function Navigation({ routes }) {
  return (
    <nav className="flex h-full items-center justify-end">
      {routes.map((route) => (
        <NavigationLink to={route.to} key={route.to} label={route.label} />
      ))}
    </nav>
  )
}

Navigation.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.exact({
      to: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
}
