import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProfileNavigator} from './profile/ProfileNavigator';
import {BubbleNavigator} from './bubble/BubbleNavigator';
import {Routes} from '../nav/NavProvider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import I18n from '../i18n';

const BottomTabs = createBottomTabNavigator();

export type MainTabsParamList = {
  BubbleNavigator: undefined;
  ProfileNavigator: undefined;
};

export const MainNavigator = () => {
  return (
    <BottomTabs.Navigator
      initialRouteName={Routes.Bubble}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';

          if (route.name === I18n.t('bubble.title')) {
            iconName = 'users';
          } else if (route.name === I18n.t('profile.title')) {
            iconName = 'user-cog';
          }

          // You can return any component that you like here!
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#007AFF',
        inactiveTintColor: 'gray',
      }}>
      <BottomTabs.Screen
        name={I18n.t('bubble.title')}
        component={BubbleNavigator}
      />
      <BottomTabs.Screen
        name={I18n.t('profile.title')}
        component={ProfileNavigator}
      />
    </BottomTabs.Navigator>
  );
};
