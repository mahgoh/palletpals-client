import { useContext, createContext } from 'react'
import { useTranslation } from 'react-i18next'

let LanguageContext = createContext()

export function useLanguage() {
  return useContext(LanguageContext)
}

export function LanguageProvider({ children }) {
  let { i18n } = useTranslation()
  let language = 'lang' in localStorage ? localStorage.lang : i18n.language

  let setLanguage = (lang) => {
    const variants = ['en', 'de']

    if (variants.includes(lang)) {
      localStorage.lang = lang
      i18n.changeLanguage(lang)
    }
  }

  let value = { language, setLanguage }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
