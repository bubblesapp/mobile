import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle, ViewStyle} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-elements';

export type Props = {
  onPress?: () => void;
  to?: string;
  params?: any;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  label?: string;
};

interface Styles {
  button: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  button: {
    marginTop: 16,
    backgroundColor: '#bbb',
  },
  text: {
    fontSize: 13,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export const ExtraButton: React.FC<Props> = ({
  onPress,
  to,
  label,
}): JSX.Element => {
  const nav = useNavigation();
  return (
    <Button
      buttonStyle={styles.button}
      type={'solid'}
      titleStyle={styles.text}
      title={label}
      onPress={() => {
        if (onPress) {
          onPress();
        } else if (to) {
          nav.navigate(to);
        }
      }}
    />
  );
};
