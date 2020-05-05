import React from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import I18n from '../../i18n';
import {customTheme} from '../../theme/theme';

export const AlertListEmpty: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{I18n.t('bubble.alerts.emptyText')}</Text>
    </View>
  );
};

type Styles = {
  wrapper: ViewStyle;
  text: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 32,
  },
  text: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    fontFamily: customTheme.fontFamily,
  },
});
