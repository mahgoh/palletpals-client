import PropTypes from 'prop-types'
import { classNames } from '@/utils/common'

export default function Spacer({ size, className, ...props }) {
  const sizeClasses = {
    sm: 'h-4',
    md: 'h-6',
    lg: 'h-12',
    xl: 'h-16',
  }

  return (
    <div
      className={classNames(className, sizeClasses[size], 'w-full')}
      {...props}
    ></div>
  )
}

Spacer.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
}

Spacer.defaultProps = {
  size: 'md',
}
