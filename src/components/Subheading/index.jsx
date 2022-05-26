import PropTypes from 'prop-types'

export default function Subheading({ title }) {
  return (
    <div>
      <h2 className="text-2xl font-bold leading-10 tracking-tight sm:text-4xl sm:leading-none lg:text-3xl">
        {title}
      </h2>
    </div>
  )
}

Subheading.propTypes = {
  title: PropTypes.string.isRequired,
}
