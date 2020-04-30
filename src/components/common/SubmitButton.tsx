import {Button, ButtonProps} from 'react-native-elements';
import React from 'react';
import {SmallSpinner} from './Spinner';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props extends ButtonProps {
  label: string;
  isSubmitting?: boolean;
}

interface Styles {
  submitButton: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  submitButton: {
    marginTop: 16,
    backgroundColor: '#007AFF',
  },
  text: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 14,
    color: '#fff',
  },
});

export const SubmitButton: React.FC<Props> = (props): JSX.Element => {
  const {disabled, label, isSubmitting} = props;
  return isSubmitting ? (
    <SmallSpinner />
  ) : (
    <Button
      {...props}
      buttonStyle={styles.submitButton}
      type={'solid'}
      title={label}
      titleStyle={styles.text}
      disabled={disabled || isSubmitting} />
  );
};
