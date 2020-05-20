import React, {useEffect, useState} from 'react';
import {Root} from './src/ui/Root';
import {FirebaseAPIProvider} from './src/services/api/firebase/FirebaseAPIProvider';
import {FirebaseAuthProvider} from './src/services/auth/firebase/FirebaseAuthProvider';
import {Platform, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import * as Font from 'expo-font';
import {Splash} from './src/ui/auth/Splash';
import * as Device from 'expo-device';
import {CurrentDevice, DeviceContext} from './src/services/util/useDevice';
import {isMountedRef, navigationRef} from './src/services/navigation/Navigation';
import {customTheme, CustomTheme} from './src/ui/theme';
import {ToastProvider} from './src/ui/common/Toast';
import {ThemeProvider} from 'react-native-elements';
import {Analytics} from './src/services/analytics/Analytics';
import {ResponsiveContainer} from './src/ui/common/ResponsiveContainer';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Test} from './src/ui/Test';
import env from './active.env';
import ENV from './environment';
import {LinkingOptions} from '@react-navigation/native/lib/typescript/src/types';
import {linking} from './src/services/navigation/Routes';

console.disableYellowBox = true;

export type AppProps = {
  isHeadless: boolean;
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
        Analytics.init();
        Analytics.setVersionName();
        setDevice({
          type: await Device.getDeviceTypeAsync(),
        });
        if (Platform.OS === 'web') {
          let deferredPrompt;

          window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            deferredPrompt = e;
            // Update UI notify the user they can install the PWA
            console.log('In PWA beforeinstallprompt');
          });
        }
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

  //return <Test />;
  return (
    <SafeAreaProvider>
      <ResponsiveContainer>
        <ThemeProvider<CustomTheme> theme={customTheme}>
          <ToastProvider>
            <DeviceContext.Provider value={device}>
              <FirebaseAPIProvider>
                <FirebaseAuthProvider>
                  <NavigationContainer
                    ref={navigationRef}
                    linking={linking}
                    fallback={<Text>Loading...</Text>}>
                    <ActionSheetProvider>
                      <Root />
                    </ActionSheetProvider>
                  </NavigationContainer>
                </FirebaseAuthProvider>
              </FirebaseAPIProvider>
            </DeviceContext.Provider>
          </ToastProvider>
        </ThemeProvider>
      </ResponsiveContainer>
    </SafeAreaProvider>
  );
};

export default App;
