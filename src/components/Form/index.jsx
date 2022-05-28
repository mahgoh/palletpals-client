import PropTypes from 'prop-types'
import { classNames } from '@/utils/common'

export default function Form({
  children,
  width,
  twoColumns,
  onSubmit,
  className,
  ...props
}) {
  const widthClasses = {
    full: 'w-full',
    'two-thirds': 'w-full lg:w-2/3',
    half: 'w-full sm:w-1/2',
    sm: 'w-full sm:max-w-sm',
    xs: 'w-full sm:max-w-xs',
  }

  function render() {
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

  function renderWithTwoColumns() {
    return (
      <form
        onSubmit={onSubmit}
        className={classNames(
          className,
          widthClasses[width],
          'grid gap-y-4 py-8 sm:grid-cols-2 sm:gap-x-4'
        )}
        {...props}
      >
        {children}
      </form>
    )
  }

  return twoColumns ? renderWithTwoColumns() : render()
}

Form.propTypes = {
  width: PropTypes.oneOf(['full', 'two-thirds', 'half', 'sm', 'xs']),
  twoColumns: PropTypes.bool,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
}

Form.defaultProps = {
  width: 'full',
  twoColumns: false,
}
