import I18n from '../../services/i18n';
import {StyleSheet, Text, TextStyle} from 'react-native';
import React from 'react';
import {customTheme} from '../theme';

interface Styles {
  title: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  title: {
    fontFamily: customTheme.boldFontFamily,
    textAlign: 'center',
    fontSize: 24,
    color: customTheme.colors.gray,
  },
});

export const Title: React.FC = (): JSX.Element => {
  return <Text style={[styles.title]}>{I18n.t('title')}</Text>;
};
