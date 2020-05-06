import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProfileNavigator} from './profile/ProfileNavigator';
import {BubbleNavigator} from './bubble/BubbleNavigator';
import {Routes} from '../nav/NavProvider';
import I18n from '../i18n';
import {TabBar} from './TabBar';

const BottomTabs = createBottomTabNavigator();

export type MainTabsParamList = {
  BubbleNavigator: undefined;
  ProfileNavigator: undefined;
};

export const MainNavigator = () => {
  return (
    <BottomTabs.Navigator
      initialRouteName={Routes.Profile}
      tabBar={(props) => <TabBar {...props} />}>
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
