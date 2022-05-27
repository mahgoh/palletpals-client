import PropTypes from 'prop-types'
import { classNames } from '@/utils/common'

export default function Main({ center, children }) {
  return (
    <main
      className={classNames(
        'mx-auto py-12 px-4 lg:max-w-6xl lg:px-10',
        center && 'flex flex-col items-center'
      )}
    >
      {children}
    </main>
  )
}

Main.propTypes = {
  center: PropTypes.bool,
}
