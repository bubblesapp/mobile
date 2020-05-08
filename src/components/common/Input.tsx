import {authStyleSheet} from '../auth/Styles';
import {
  Icon,
  Input as RNEInput,
  InputProps,
  Overlay,
  Tooltip,
} from 'react-native-elements';
import React, {useRef, useState} from 'react';
import {customTheme} from '../../theme/theme';
import {DataInfo} from './DataInfo';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props extends InputProps {
  borderOnFocus?: boolean;
  doOnBlur: (e: any) => void;
  secure?: boolean;
  tooltip?: string;
}

const onFocusBorder = {
  borderColor: customTheme.colors.darkBlue,
};

export const Input: React.FC<Props> = (props) => {
  const [focused, setFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(props.secure);
  return (
    <RNEInput
      autoCorrect={false}
      errorStyle={[styles.error, props.errorStyle]}
      inputContainerStyle={[
        styles.inputContainer,
        props.inputContainerStyle,
        focused && onFocusBorder,
      ]}
      inputStyle={[styles.input, props.inputStyle, {outline: 'none'}]}
      labelStyle={[styles.label, props.labelStyle]}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (props.doOnBlur) {
          props.doOnBlur(e);
        }
        setFocused(false);
      }}
      secureTextEntry={isSecure}
      rightIconContainerStyle={[styles.inputRightIcon]}
      rightIcon={
        props.secure ? (
          {
            size: 20,
            color: customTheme.Input.placeholderTextColor,
            type: 'font-awesome',
            name: isSecure ? 'eye' : 'eye-slash',
            onPress: () => setIsSecure(!isSecure),
          }
        ) : props.tooltip ? (
          <DataInfo text={props.tooltip} />
        ) : undefined
      }
      {...props}
    />
  );
};

Input.defaultProps = {
  borderOnFocus: true,
  secure: false,
};

type Styles = {
  error: TextStyle;
  label: TextStyle;
  inputContainer: ViewStyle;
  input: ViewStyle;
  inputRightIcon: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  error: {
    fontFamily: 'Nunito-Bold',
    margin: 0,
    marginBottom: 8,
    padding: 0,
  },
  label: {
    fontFamily: 'Nunito',
    fontSize: 14,
    fontWeight: 'normal',
    color: customTheme.colors.gray,
  },
  inputContainer: {
    marginVertical: 8,
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    height: 52,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 1,
  },
  inputRightIcon: {
    paddingRight: 16,
  },
  input: {
    borderRadius: 5,
    paddingHorizontal: 16,
    fontSize: 14,
    height: 50,
    backgroundColor: '#fff',
    fontFamily: 'Nunito-Bold',
    borderWidth: 0,
  },
});
