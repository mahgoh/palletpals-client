import PropTypes from 'prop-types'
import { classNames, formatPrice } from '@/utils/common'

export function FinancialTable({ rows }) {
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={i}
            className="border-b border-gray-200 last:border-b-0 dark:border-gray-700"
          >
            <td className="py-4">
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {row.key}
              </div>
            </td>
            <td
              className={classNames(
                'py-4 text-right',
                row.bold
                  ? 'font-semibold text-gray-900 dark:text-gray-100'
                  : 'text-gray-500 dark:text-gray-300'
              )}
            >
              {formatPrice(row.value)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function TableHead({ children, className, ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export function TableBody({ children, className, ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export function TableHeadRow({ children, className, ...props }) {
  return (
    <div
      className={classNames(
        'mb-5 grid border-b border-gray-200 pb-3 text-gray-500 dark:border-gray-700 dark:text-gray-400',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function TableRow({ children, className, ...props }) {
  return (
    <div
      className={classNames(
        'mb-5 grid border-b border-gray-200 pb-5 last:mb-0 last:border-0 dark:border-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function TableCell({ children, className, ...props }) {
  return (
    <div
      className={classNames(
        'inline-flex items-center last:justify-end',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default function Table({ rows }) {
  if (!rows || rows.length === 0) {
    return null
  }

  return (
    <div className="mt-4 flex w-full flex-col">
      <div className="inline-block min-w-full py-2 align-middle">
        <div className="overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700">
          <table className="min-w-full ">
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className="divide-x divide-gray-200 dark:divide-gray-700"
                >
                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 dark:text-gray-100 sm:pl-6">
                    {row.key}
                  </td>
                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 dark:text-gray-300  sm:pr-6">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

Table.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.exact({
      key: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ).isRequired,
}
