import {Button, NativeBase} from 'native-base';
import React from 'react';
import {SmallSpinner} from './Spinner';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Text} from 'native-base';

interface Props extends NativeBase.Button {
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
  },
  text: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 14,
  },
});

export const SubmitButton: React.FC<Props> = (props): JSX.Element => {
  const {disabled, label, isSubmitting} = props;
  return isSubmitting ? (
    <SmallSpinner />
  ) : (
    <Button
      {...props}
      style={styles.submitButton}
      block
      disabled={disabled || isSubmitting}>
      <Text style={styles.text}>{label}</Text>
    </Button>
  );
};
