import PropTypes from 'prop-types'
import { classNames } from '@/utils/common'

export default function Button({
  children,
  onClick,
  className,
  color = 'primary',
  ...props
}) {
  const colorClasses = {
    primary:
      'bg-orange-500 focus:bg-orange-700 hover:bg-orange-700 focus:ring-orange-500 text-white',
    secondary:
      'bg-orange-100 focus:bg-orange-200 hover:bg-orange-200 focus:ring-orange-500 text-orange-500',
    red: 'bg-rose-500 focus:bg-rose-700 hover:bg-rose-700 focus:ring-rose-500 text-white',
  }

  return (
    <button
      className={classNames(
        className,
        colorClasses[color],
        'border border-transparent py-2 px-4 text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary', 'red']),
}
