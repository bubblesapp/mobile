import React, {useEffect, useState} from 'react';
import {Root} from './src/components/Root';
import {APIProvider} from './src/api/useAPI';
import {AuthProvider} from './src/auth/Auth';
import {View, StyleSheet, ViewStyle, Platform, SafeAreaView, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import * as Font from 'expo-font';
import {Splash} from './src/onboarding/Splash';
import * as Device from 'expo-device';
import {CurrentDevice, DeviceContext} from './src/device/useDevice';
import {isMountedRef, navigationRef} from './src/nav/Navigation';

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
  const [ready, setReady] = useState(false);
  const [device, setDevice] = useState<CurrentDevice>();

  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);

  // Initialization
  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        Nunito: require('./assets/fonts/Nunito-Regular.ttf'),
        'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
        'Nunito-Black': require('./assets/fonts/Nunito-Black.ttf'),
      });
      try {
        setDevice({
          type: await Device.getDeviceTypeAsync(),
        });
      } catch (err) {
        console.log(err);
      }
      setReady(true);
    })();
  }, []);

  if (isHeadless) {
    return null;
  }
  if (!ready) {
    return <Splash />;
  }
  return (
    <View style={styles.wrapperStyle}>
      <Container>
        <DeviceContext.Provider value={device}>
          <APIProvider>
            <AuthProvider>
              <NavigationContainer ref={navigationRef}>
                <ActionSheetProvider>
                  <Root />
                </ActionSheetProvider>
              </NavigationContainer>
            </AuthProvider>
          </APIProvider>
        </DeviceContext.Provider>
      </Container>
    </View>
  );
};

export default App;
