import React from 'react';
import {Root} from './src/components/Root';
import {APIProvider} from './src/api/useAPI';
import {AuthProvider} from './src/auth/Auth';
import {View, StyleSheet, ViewStyle, Platform, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';

console.disableYellowBox = true;

export type AppProps = {
  isHeadless: boolean;
};
type Styles = {
  containerStyle: ViewStyle;
  wrapperStyle: ViewStyle;
};

const webContainerStyle: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  maxWidth: 500,
  padding: 32,
};

const nativeContainerStyle: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
};

const styles = StyleSheet.create<Styles>({
  containerStyle:
    Platform.OS === 'web' ? webContainerStyle : nativeContainerStyle,
  wrapperStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const Container: React.FC = ({children}) => {
  return <View style={styles.containerStyle}>{children}</View>;
};

const App: React.FC<AppProps> = ({isHeadless}) => {
  if (isHeadless) {
    return null;
  }
  return (
    <SafeAreaView style={styles.wrapperStyle}>
      <Container>
        <APIProvider>
          <AuthProvider>
            <NavigationContainer>
              <ActionSheetProvider>
                <Root />
              </ActionSheetProvider>
            </NavigationContainer>
          </AuthProvider>
        </APIProvider>
      </Container>
    </SafeAreaView>
  );
};

export default App;
