import { useContext, useState, createContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { supportedLanguages } from '@/i18n'
import { User } from '@/services/api'

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
      persistLanguage()
      i18n.changeLanguage(language)
    }
  }

  let persistLanguage = async () => {
    localStorage.lang = language

    // send request to server to persist appearance
    await User.patch({
      language,
    })
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
