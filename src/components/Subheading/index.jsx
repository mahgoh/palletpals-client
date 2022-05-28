import PropTypes from 'prop-types'

export default function Subheading({ title, children }) {
  function render() {
    return (
      <div>
        <h2 className="text-2xl font-bold leading-10 tracking-tight sm:text-4xl sm:leading-none lg:text-3xl">
          {title}
        </h2>
      </div>
    )
  }

  function renderWithChildren() {
    return (
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold leading-10 tracking-tight sm:text-4xl sm:leading-none lg:text-3xl">
          {title}
        </h2>
        {children}
      </div>
    )
  }

  return children ? renderWithChildren() : render()
}

Subheading.propTypes = {
  title: PropTypes.string.isRequired,
}
