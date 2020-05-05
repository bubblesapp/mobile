import {authStyleSheet} from '../Styles';
import {
  Icon,
  Input as RNEInput,
  InputProps,
  Overlay,
  Tooltip,
} from 'react-native-elements';
import React, {useRef, useState} from 'react';
import {customTheme} from '../../../theme/theme';
import {DataInfo} from '../../common/DataInfo';

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
      errorStyle={authStyleSheet.error}
      inputContainerStyle={[authStyleSheet.inputContainer]}
      inputStyle={[authStyleSheet.input, {outline: 'none'}]}
      labelStyle={authStyleSheet.label}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (props.doOnBlur) {
          props.doOnBlur(e);
        }
        setFocused(false);
      }}
      secureTextEntry={isSecure}
      rightIconContainerStyle={authStyleSheet.inputRightIcon}
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
