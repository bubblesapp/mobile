import React from 'react';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Button, ButtonProps} from 'react-native-elements';
import {customTheme} from '../theme';

export const ExtraButton: React.FC<ButtonProps> = (props): JSX.Element => {
  return (
    <Button
      {...props}
      buttonStyle={[styles.ctaLight, props.buttonStyle]}
      titleStyle={[styles.ctaLightText, props.titleStyle]}
    />
  );
};

type Styles = {
  ctaLight: ViewStyle;
  ctaLightText: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  ctaLight: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 1,
    borderColor: customTheme.colors.ctaBackground,
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 16,
  },
  ctaLightText: {
    color: customTheme.colors.ctaBackground,
    fontSize: 16,
    fontFamily: customTheme.boldFontFamily,
  },
});
