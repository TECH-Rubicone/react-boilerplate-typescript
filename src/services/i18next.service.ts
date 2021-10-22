// outsource dependencies
import { initReactI18next } from 'react-i18next';
import i18n, { FormatFunction, TFunction } from 'i18next';

// configs
import config from 'configs';
import en from 'configs/localization/en.json';
import ru from 'configs/localization/ru.json';
import uk from 'configs/localization/ukr.json';

export const LANGUAGES = {
  EN: {
    short: 'en',
    full: 'English',
  },
  RU: {
    short: 'ru',
    full: 'Russian',
  },
  UK: {
    short: 'uk',
    full: 'Ukrainian',
  },
};

export class LanguageService {
  static translate: TFunction = (keys, options) => i18n.t(keys, options);

  static customFormatter: FormatFunction = (value, format) => {
    const [ignoredAll, type = '', src = ''] = (format || '').match(/([^=]*)=(.*)/) || [];

    switch (type) {
      default: return value;
      case 'plural': return value === 1 ? '' : src;
      case 'single': return value !== 1 ? '' : src;
    }
  }

  static initialize = () => i18n
    .use(initReactI18next)
    .init({
      debug: config.DEBUG,
      lng: LANGUAGES.EN.short,
      fallbackLng: LANGUAGES.EN.short,
      interpolation: {
        escapeValue: false,
        formatSeparator: ':',
        format: LanguageService.customFormatter,
      },
      resources: {
        en,
        ru,
        uk,
      },
    }).then(() => config.DEBUG && console.info('%c LanguageService.initialize',
      'color: #035DC8; font-weight: bolder; font-size: 12px;'))
    .catch(error => config.DEBUG && console.error('%c LanguageService.initialize',
      'background: #EE5577; color: #FFF; font-weight: bolder; font-size: 12px;',
      '\n error:', error))
}

export default LanguageService;
