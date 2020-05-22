import I18n from '../i18n';
import moment from 'moment';
import {Linking, Platform} from 'react-native';

export const daysAgoString = (timestamp: number | undefined): string => {
  if (!timestamp) {
    return I18n.t('bubble.friends.notMetYet');
  }
  const days = moment().diff(moment(timestamp).startOf('day'), 'days');
  switch (days) {
    case 0:
      return I18n.t('bubble.friends.lastMetToday');
    case 1:
      return I18n.t('bubble.friends.lastMetYesterday');
    default:
      return I18n.t('bubble.friends.lastMetXDaysAgo').replace(
        '$0',
        days.toString(),
      );
  }
};

export const daysAgo = (timestamp: number | undefined): string => {
  if (!timestamp) {
    return '';
  }
  const days = moment().diff(moment(timestamp).startOf('day'), 'days');
  switch (days) {
    case 0:
      return I18n.t('bubble.friends.today');
    case 1:
      return I18n.t('bubble.friends.yesterday');
    default:
      return I18n.t('bubble.friends.xDaysAgo').replace('$0', days.toString());
  }
};

export const openURLInNewTab = (url: string) => {
  Platform.OS === 'web' ? window.open(url, '_blank') : Linking.openURL(url);
};
