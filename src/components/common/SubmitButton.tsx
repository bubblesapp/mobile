import {Button, ButtonProps} from 'react-native-elements';
import React from 'react';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {customTheme} from '../../theme/theme';

interface Styles {
  container: ViewStyle;
  button: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    alignSelf: 'stretch',
    height: 50,
  },
  button: {
    marginHorizontal: 8,
    padding: 8,
    height: 50,
    backgroundColor: customTheme.colors.ctaBackground,
    borderRadius: 25,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: customTheme.colors.ctaText,
  },
});

export const SubmitButton: React.FC<ButtonProps> = (props): JSX.Element => {
  //const {disabled, label, isSubmitting} = props;
  return (
    <Button
      {...props}
      containerStyle={[styles.container, props.containerStyle]}
      buttonStyle={[styles.button, props.buttonStyle]}
      disabledStyle={[styles.button, {opacity: 0.2}]}
      type={'solid'}
      titleStyle={[styles.text, props.titleStyle]}
      disabledTitleStyle={[styles.text, props.disabledTitleStyle]}
    />
  );
};
