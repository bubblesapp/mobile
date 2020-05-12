import I18n from 'i18n-js';
import {en} from './locales/en';
import {fr} from './locales/fr';
import * as RNLocalize from 'react-native-localize';

I18n.fallbacks = true;

I18n.translations = {
  en,
  fr,
};

I18n.locale =
  RNLocalize.findBestAvailableLanguage(Object.keys(I18n.translations))
    ?.languageTag ?? 'en';

export default I18n;
