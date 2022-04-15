export default function Pagetitle({ children }) {
  return (
    <div>
      <h1 className="text-4xl font-extrabold leading-10 tracking-tight sm:text-6xl sm:leading-none lg:text-5xl">
        {children}
      </h1>
    </div>
  )
}
