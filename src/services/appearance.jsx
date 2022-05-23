import { useContext, useState, useEffect, createContext } from 'react'
import { User } from '@/services/api'

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
      persistAppearance()
      applyClass()
    }
  }

  let persistAppearance = async () => {
    localStorage.appearance = appearance

    // send request to server to persist appearance
    await User.patch({
      appearance: appearance.toUpperCase(),
    })
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
