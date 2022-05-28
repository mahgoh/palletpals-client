import PropTypes from 'prop-types'
import { classNames } from '@/utils/common'

export default function TextField({
  name,
  type,
  label,
  value,
  onChange,
  placeholder,
  error,
  showError,
  className,
  ...props
}) {
  if (!name) {
    return null
  }

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className={classNames(
            className,
            'mb-1 block text-sm font-medium text-gray-700 dark:text-gray-100'
          )}
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        className={classNames(
          className,
          error && 'border-red-500',
          'block w-full rounded-md border-gray-300 py-3 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-orange-500'
        )}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        {...props}
      />
      {error && showError && (
        <p className="mt-2 text-sm text-red-500" id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number']),
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  showError: PropTypes.bool,
  className: PropTypes.string,
}

TextField.defaultProps = {
  type: 'text',
  label: null,
  value: '',
  onChange: () => {},
  placeholder: '',
  error: null,
  showError: true,
}
