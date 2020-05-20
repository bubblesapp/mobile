import {useAuth} from '../services/auth/useAuth';
import {NotificationsManager} from '../services/notifications/NotificationsManager';
import {StatusBar} from 'react-native';
import React from 'react';
import {createStackNavigator, StackNavigationProp,} from '@react-navigation/stack';
import {MainNavigator} from './main/MainNavigator';
import {AuthNavigator} from './auth/AuthNavigator';
import {DynamicLinkHandler} from '../services/navigation/DynamicLinkHandler';

export type RootStackParamList = {
  AuthNavigator: undefined;
  MainNavigator: undefined;
};

export type RootNavigationProp = StackNavigationProp<RootStackParamList>;

const RootStack = createStackNavigator<RootStackParamList>();

export const Root: React.FC = () => {
  const auth = useAuth();
  return (
    <>
      <NotificationsManager />
      <DynamicLinkHandler />
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <RootStack.Navigator
        headerMode={'none'}
        screenOptions={{animationEnabled: false}}>
        {auth.state?.uid && auth.state?.name ? (
          <RootStack.Screen name="MainNavigator" component={MainNavigator} />
        ) : (
          <RootStack.Screen name="AuthNavigator" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </>
  );
};