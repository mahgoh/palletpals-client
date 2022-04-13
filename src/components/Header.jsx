import Navigation from '@/components/Navigation'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 h-20 border-b border-gray-200 bg-white">
      <div className="mx-auto grid h-full grid-cols-2 px-4 lg:max-w-6xl lg:px-10">
        <div className="inline-flex items-center text-xl font-extrabold text-orange-500 ">
          PalletPals
        </div>
        <Navigation />
      </div>
    </header>
  )
}
