import PropTypes from 'prop-types'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { classNames } from '@/utils/common'

export function AlertGreen({ message, className }) {
  if (!message) return null

  return (
    <div className={classNames('rounded-md bg-green-50 p-4', className)}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-6 w-6 text-green-500"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="font-medium text-green-800">{message}</p>
        </div>
      </div>
    </div>
  )
}

AlertGreen.propTypes = {
  message: PropTypes.string.isRequired,
}
