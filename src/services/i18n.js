import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '../locales/en/en.json';
import es from '../locales/es/es.json';
import val from '../locales/val/val.json';

const language = 'i18nextLng';

const resources = {
  en: { translation: en },
  es: { translation: es },
  val: { translation: val },
}

const i18nConfig = {
  resources,
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false
  }
}

// i18n LanguageDetector config
const i18nLDConfig = {
  order: ['localStorage', 'navigator'],

  // keys or params to lookup language from
  lookupLocalStorage: language,

  // cache user language on
  caches: ['localStorage'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ...i18nConfig,
    ...i18nLDConfig
  });

export default i18n;
