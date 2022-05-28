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
            <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {row.key}
              </div>
            </td>
            <td
              className={classNames(
                'py-4 pl-3 pr-4 text-right text-sm sm:pr-6 md:pr-0',
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
