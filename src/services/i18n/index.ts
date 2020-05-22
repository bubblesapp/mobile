import I18n from 'i18n-js';
import {en} from './locales/en';
import {fr} from './locales/fr';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment';
import 'moment/locale/fr';

I18n.fallbacks = true;

I18n.translations = {
  en,
  fr,
};

const lang = RNLocalize.findBestAvailableLanguage(
  Object.keys(I18n.translations),
)?.languageTag;

I18n.locale = lang ?? 'en';

moment.locale(lang);

export default I18n;
