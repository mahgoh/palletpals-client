import { useContext, useState, createContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

let LanguageContext = createContext()
const languages = ['en', 'de']

export function useLanguage() {
  return useContext(LanguageContext)
}

export function LanguageProvider({ children }) {
  let { i18n } = useTranslation()
  let [language, setLanguage] = useState(
    'lang' in localStorage ? localStorage.lang : i18n.language
  )

  let applyLanguage = () => {
    if (languages.includes(language)) {
      localStorage.lang = language
      i18n.changeLanguage(language)
    }
  }

  useEffect(() => {
    applyLanguage()
  }, [language])

  let value = { language, languages, setLanguage }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
