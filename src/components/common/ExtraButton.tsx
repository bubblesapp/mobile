import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle, ViewStyle} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'native-base';

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
    backgroundColor: '#e4e4e4'
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 13,
  },
});

export const ExtraButton: React.FC<Props> = ({
  onPress,
  to,
  params,
  label,
}): JSX.Element => {
  const navigation = useNavigation();
  return (
    <Button
      style={styles.button}
      block
      onPress={() => {
        if (onPress) {
          onPress();
        } else if (to) {
          navigation.navigate(to, params);
        }
      }}>
      <Text style={styles.text}>{label}</Text>
    </Button>
  );
};
