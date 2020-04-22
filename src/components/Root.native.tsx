import {AuthProvider, useAuth} from '../auth/Auth';
import {NotificationsManager} from '../notifications/NotificationsManager';
import {DynamicLinkHandler} from '../nav/DynamicLinkHandler';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {MainNavigator} from './MainNavigator';
import {AuthNavigator} from './auth/AuthNavigator';
import {Root as NativeBaseRoot, StyleProvider} from 'native-base';
import getTheme from '../native-base-theme/components';
import commonColor from '../native-base-theme/variables/commonColor';

export type RootStackParamList = {
  AuthNavigator: undefined;
  MainNavigator: undefined;
};

export type RootNavigationProp = StackNavigationProp<RootStackParamList>;

const RootStack = createStackNavigator<RootStackParamList>();

export const Root: React.FC = () => {
  const auth = useAuth();
  return (
    <NativeBaseRoot>
      <StyleProvider style={getTheme(commonColor)}>
        <NavigationContainer>
          <NotificationsManager />
          <DynamicLinkHandler />
          <StatusBar barStyle={'dark-content'} translucent={false} />
          <RootStack.Navigator
            headerMode={'none'}
            screenOptions={{animationEnabled: false}}>
            {auth.state?.uid && auth.state?.emailVerified ? (
              <RootStack.Screen
                name="MainNavigator"
                component={MainNavigator}
              />
            ) : (
              <RootStack.Screen
                name="AuthNavigator"
                component={AuthNavigator}
              />
            )}
          </RootStack.Navigator>
        </NavigationContainer>
      </StyleProvider>
    </NativeBaseRoot>
  );
};
