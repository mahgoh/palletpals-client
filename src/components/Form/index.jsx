import PropTypes from 'prop-types'
import { classNames } from '@/utils/common'

export default function Form({
  children,
  width,
  onSubmit,
  className,
  ...props
}) {
  const widthClasses = {
    full: 'w-full',
    half: 'w-full sm:w-1/2',
    sm: 'w-full sm:max-w-sm',
    xs: 'w-full sm:max-w-xs',
  }

  return (
    <form
      onSubmit={onSubmit}
      className={classNames(className, widthClasses[width], 'py-8')}
      {...props}
    >
      {children}
    </form>
  )
}

Form.propTypes = {
  width: PropTypes.oneOf(['full', 'half', 'sm', 'xs']),
  onSubmit: PropTypes.func,
  className: PropTypes.string,
}

Form.defaultProps = {
  width: 'full',
}
