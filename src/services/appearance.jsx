import { useContext, createContext } from 'react'

let AppearanceContext = createContext()

export function useAppearance() {
  return useContext(AppearanceContext)
}

export function AppearanceProvider({ children }) {
  let appearance =
    'appearance' in localStorage ? localStorage.appearance : 'media'

  let setAppearance = (appearance) => {
    const variants = ['light', 'dark', 'media']

    if (variants.includes(appearance)) {
      localStorage.appearance = appearance
      window.location.reload()
    }
  }

  let applyAppearance = () => {
    if (
      appearance === 'dark' ||
      (appearance === 'media' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  applyAppearance()

  let value = { appearance, setAppearance, applyAppearance }

  return (
    <AppearanceContext.Provider value={value}>
      {children}
    </AppearanceContext.Provider>
  )
}
