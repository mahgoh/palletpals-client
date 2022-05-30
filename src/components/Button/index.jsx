import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { classNames } from '@/utils/common'

export function LinkButton({ to, ...props }) {
  const navigate = useNavigate()

  if (!to) {
    return null
  }

  function onClick(e) {
    e.preventDefault()
    navigate(to)
  }

  return <Button onClick={onClick} {...props}></Button>
}

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
}

export default function Button({
  children,
  onClick,
  className,
  color = 'primary',
  size = 'md',
  disabled,
  ...props
}) {
  const colorClasses = {
    primary:
      'bg-orange-500 focus:bg-orange-700 hover:bg-orange-700 focus:ring-orange-500 text-white',
    secondary:
      'bg-orange-100 focus:bg-orange-200 hover:bg-orange-200 focus:ring-orange-500 text-orange-500',
    red: 'bg-rose-500 focus:bg-rose-700 hover:bg-rose-700 focus:ring-rose-500 text-white',
    redOutline:
      'bg-rose-500/20 focus:bg-rose-500 hover:bg-rose-500 focus:ring-rose-500 text-rose-500 hover:text-white focus:text-white',
  }

  const sizeClasses = {
    sm: 'px-4 py-2 sm:px-6 text-sm',
    md: 'px-6 py-2 sm:py-3 sm:px-8',
  }

  return (
    <button
      className={classNames(
        className,
        !disabled && colorClasses[color],
        sizeClasses[size],
        disabled &&
          'cursor-not-allowed bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
        'items-center rounded-md border border-transparent text-base font-medium ring-offset-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 '
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary', 'red', 'redOutline']),
  size: PropTypes.oneOf(['md', 'sm']),
  disabled: PropTypes.bool,
}
