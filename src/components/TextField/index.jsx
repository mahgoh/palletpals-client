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
  className,
  ...props
}) {
  if (!name) {
    return null
  }

  return (
    <div>
      {label ? (
        <label
          htmlFor={name}
          className={classNames(
            className,
            'block text-sm font-medium text-gray-700 dark:text-gray-100'
          )}
        >
          {label}
        </label>
      ) : null}
      <div className="mt-1">
        <input
          id={name}
          name={name}
          type={type}
          className={classNames(
            className,
            'block w-full border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-orange-500 sm:text-sm'
          )}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          {...props}
        />
      </div>
      {error ? (
        <p className="mt-2 text-sm text-red-500" id={`${name}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  )
}

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'password']),
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
}

TextField.defaultProps = {
  type: 'text',
  label: null,
  value: '',
  onChange: () => {},
  placeholder: '',
  error: null,
}
