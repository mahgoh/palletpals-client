import { useContext, useState, createContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { supportedLanguages } from '@/i18n'

let LanguageContext = createContext()

export function useLanguage() {
  return useContext(LanguageContext)
}

export function LanguageProvider({ children }) {
  let { i18n } = useTranslation()
  let [language, setLanguage] = useState(
    'lang' in localStorage ? localStorage.lang : i18n.language
  )

  let applyLanguage = () => {
    if (supportedLanguages.includes(language)) {
      localStorage.lang = language
      i18n.changeLanguage(language)
    }
  }

  useEffect(() => {
    applyLanguage()
  }, [language])

  let value = { language, languages: supportedLanguages, setLanguage }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
