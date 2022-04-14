import { useContext, useState, useEffect, createContext } from 'react'

let AppearanceContext = createContext()
const appearances = ['light', 'dark', 'media']

export function useAppearance() {
  return useContext(AppearanceContext)
}

export function AppearanceProvider({ children }) {
  let [appearance, setAppearance] = useState(
    'appearance' in localStorage ? localStorage.appearance : 'media'
  )

  let applyAppearance = () => {
    if (appearances.includes(appearance)) {
      localStorage.appearance = appearance
      applyClass()
    }
  }

  let applyClass = () => {
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

  useEffect(() => {
    applyAppearance()
  }, [appearance])

  let value = { appearance, appearances, setAppearance }

  return (
    <AppearanceContext.Provider value={value}>
      {children}
    </AppearanceContext.Provider>
  )
}
