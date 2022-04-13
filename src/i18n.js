import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import common_en from '@/locales/en/common.json'
import common_de from '@/locales/de/common.json'

const resources = {
  en: {
    translation: {
      common: common_en,
    },
  },
  de: {
    translation: {
      common: common_de,
    },
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    debug: GLOBAL.DEBUG,
    supportedLngs: ['en', 'de'],
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
