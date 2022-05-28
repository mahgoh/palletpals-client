import i18n from 'i18next'
import ICU from 'i18next-icu'
import { initReactI18next } from 'react-i18next'

import common_en from '@/locales/en/common.json'
import common_de from '@/locales/de/common.json'
import common_fr from '@/locales/fr/common.json'

import validation_en from '@/locales/en/validation.json'
import validation_de from '@/locales/de/validation.json'
import validation_fr from '@/locales/fr/validation.json'

import message_en from '@/locales/en/message.json'
import message_de from '@/locales/de/message.json'
import message_fr from '@/locales/fr/message.json'

const supportedLanguages = ['en', 'de', 'fr']
const resources = {
  en: {
    translation: {
      common: common_en,
      validation: validation_en,
      message: message_en,
    },
  },
  de: {
    translation: {
      common: common_de,
      validation: validation_de,
      message: message_de,
    },
  },
  fr: {
    translation: {
      common: common_fr,
      validation: validation_fr,
      message: message_fr,
    },
  },
}

i18n
  .use(ICU)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    debug: false,
    supportedLngs: supportedLanguages,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
export { supportedLanguages }
