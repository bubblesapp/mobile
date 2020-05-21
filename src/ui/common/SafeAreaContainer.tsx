import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {SafeAreaViewProps} from 'react-native-safe-area-context';
import React from 'react';
import {Helmet} from 'react-helmet';

type Props = {
  webCss?: string;
  containerStyle?: ViewStyle;
  containerProps?: ViewProps;
  safeAreaViewProps?: SafeAreaViewProps;
  scrollViewProps?: ScrollViewProps;
  topColor?: string;
  bottomColor?: string;
};

export const SafeAreaContainer: React.FC<Props> = ({
  children,
  ...otherProps
}) => {
  return (
    <View
      style={[styles.container, otherProps.containerStyle]}
      {...otherProps.containerProps}>
      {Platform.OS === 'web' && (
        <Helmet>
          <style>{otherProps.webCss}</style>
        </Helmet>
      )}
      <View
        style={[styles.topBackground, {backgroundColor: otherProps.topColor}]}
      />
      <View
        style={[
          styles.bottomBackground,
          {backgroundColor: otherProps.bottomColor},
        ]}
      />
      <SafeAreaView
        style={styles.safeAreaView}
        {...otherProps.safeAreaViewProps}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          enabled={true}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView {...otherProps.scrollViewProps}>{children}</ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

type Styles = {
  container: ViewStyle;
  topBackground: ViewStyle;
  bottomBackground: ViewStyle;
  safeAreaView: ViewStyle;
  keyboardAvoidingView: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  safeAreaView: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
});

SafeAreaContainer.defaultProps = {
  webCss:
    'html { overflow: hidden; position: fixed; } body { overflow: hidden; position: fixed; }',
  topColor: '#fff',
  bottomColor: '#fff',
};
