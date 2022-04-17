import PropTypes from 'prop-types'

export default function Pagetitle({ title }) {
  return (
    <div>
      <h1 className="text-4xl font-extrabold leading-10 tracking-tight sm:text-6xl sm:leading-none lg:text-5xl">
        {title}
      </h1>
    </div>
  )
}

Pagetitle.propTypes = {
  title: PropTypes.string.isRequired,
}
