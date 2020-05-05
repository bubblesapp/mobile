import React from 'react';
import {Text, StyleSheet, TextStyle} from 'react-native';
import {customTheme} from '../../../theme/theme';

interface Styles {
  infoText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  infoText: {
    lineHeight: 24,
    textAlign: 'center',
    fontSize: 14,
    color: customTheme.colors.darkBlue,
    alignSelf: 'stretch',
    fontFamily: 'Nunito',
  },
});

export const InfoText: React.FC = ({children}): JSX.Element | null =>
  children ? <Text style={styles.infoText}>{children}</Text> : null;
