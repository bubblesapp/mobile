import React from 'react';
import {ListItem} from 'react-native-elements';
import I18n from '../../../services/i18n';
import {StyleSheet, TextStyle} from 'react-native';
import {customTheme} from '../../theme';

export const AlertsHeader: React.FC = () => {
  return (
    <ListItem
      title={I18n.t('bubble.alerts.alertsHeaderTitle')}
      titleStyle={styles.title}
      subtitle={I18n.t('bubble.alerts.alertsHeaderSubtitle')}
      subtitleStyle={styles.subtitle}
    />
  );
};

type Styles = {
  title: TextStyle;
  subtitle: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  title: {
    fontFamily: customTheme.fontFamily,
    color: customTheme.colors.mediumGray,
    fontSize: 14,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: customTheme.fontFamily,
    color: customTheme.colors.mediumGray,
    fontSize: 14,
    textAlign: 'center',
  },
});
