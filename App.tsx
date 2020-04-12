import React from 'react';
import {Root as NativeBaseRoot, StyleProvider, Text} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {MainNavigator} from './src/components/MainNavigator';
import {AuthProvider, useAuth} from './src/auth/Auth';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {AuthNavigator} from './src/components/auth/AuthNavigator';
import {StatusBar} from 'react-native';
import {DynamicLinkHandler} from './src/nav/DynamicLinkHandler';
import {NotificationsManager} from './src/notifications/NotificationsManager';
import {APIProvider} from './src/api/useAPI';
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';

console.disableYellowBox = true;

export type RootStackParamList = {
  AuthNavigator: undefined;
  MainNavigator: undefined;
};

export type RootNavigationProp = StackNavigationProp<RootStackParamList>;

const RootStack = createStackNavigator<RootStackParamList>();

const Root: React.FC = () => {
  const auth = useAuth();
  return (
    <RootStack.Navigator
      headerMode={'none'}
      screenOptions={{animationEnabled: false}}>
      {auth.state?.uid && auth.state?.emailVerified ? (
        <RootStack.Screen name="MainNavigator" component={MainNavigator} />
      ) : (
        <RootStack.Screen name="AuthNavigator" component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  );
};

export type AppProps = {
  isHeadless: boolean;
};

const App: React.FC<AppProps> = ({isHeadless}) => {
  if (isHeadless) {
    return null;
  }
  return (
    <NativeBaseRoot>
      <StyleProvider style={getTheme(commonColor)}>
        <NavigationContainer>
          <APIProvider>
            <AuthProvider>
              <NotificationsManager />
              <DynamicLinkHandler />
              <StatusBar barStyle={'dark-content'} translucent={false} />
              <Root />
            </AuthProvider>
          </APIProvider>
        </NavigationContainer>
      </StyleProvider>
    </NativeBaseRoot>
  );
};

export default App;
