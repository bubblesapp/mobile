import React from 'react';
import {ActivityIndicator, StyleSheet, View, ViewStyle} from 'react-native';

interface Styles {
  spinner: ViewStyle;
  spinnerContainer: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerContainer: {
    height: 50,
    marginTop: 10,
  },
});

interface Props {
  spinnerStyle?: ViewStyle;
  size: number | 'small' | 'large';
  color?: string;
}

export const Spinner: React.FC<Props> = ({
  size,
  color,
  spinnerStyle,
}): JSX.Element => {
  const composedSpinnerStyle = [styles.spinner, spinnerStyle] as ViewStyle;
  return (
    <View style={composedSpinnerStyle}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export const SmallSpinner: React.FC = () => (
  <View style={styles.spinnerContainer}>
    <Spinner size={'small'} />
  </View>
);
