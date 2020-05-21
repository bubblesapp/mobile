import React from 'react';
import {ScrollView, StyleSheet, View, ViewProps, ViewStyle} from 'react-native';
import {customTheme} from '../theme';

type Props = {
  containerStyle?: ViewStyle;
  containerProps?: ViewProps;
  scrollViewContentContainerStyle?: ViewStyle;
  topColor?: string;
  bottomColor?: string;
};

export const Template: React.FC<Props> = ({children, ...otherProps}) => {
  return (
    <View
      style={[styles.container, otherProps.containerStyle]}
      {...otherProps.containerProps}>
      <View
        style={[styles.topBackground, {backgroundColor: otherProps.topColor}]}
      />
      <View
        style={[
          styles.bottomBackground,
          {backgroundColor: otherProps.bottomColor},
        ]}
      />
      <ScrollView
        contentContainerStyle={[
          styles.scrollViewContentContainer,
          otherProps.scrollViewContentContainerStyle,
        ]}>
        {children}
      </ScrollView>
    </View>
  );
};

type Styles = {
  container: ViewStyle;
  topBackground: ViewStyle;
  bottomBackground: ViewStyle;
  scrollViewContentContainer: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
  },
  topBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0,
    height: '50%',
  },
  bottomBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
    top: '50%',
  },
  scrollViewContentContainer: {
    flexGrow: 1,
  },
});

Template.defaultProps = {
  topColor: customTheme.colors.lightBlue,
  bottomColor: '#fff',
};
