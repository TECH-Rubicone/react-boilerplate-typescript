// outsource dependencies
import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

// local dependencies
import enLocale from './en/locale.json';
import ruLocale from './ru/locale.json';

const options: InitOptions = {
  resources: {
    en: {
      translation: enLocale
    },
    ru: {
      translation: ruLocale
    },
  },
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  },
  detection: {
    order: ['localStorage', 'cookie'],
    caches: ['localStorage', 'cookie'],
  }
};

i18n
  .use(initReactI18next)
  .init(options);

export default i18n;
