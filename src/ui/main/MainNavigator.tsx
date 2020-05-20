import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProfileNavigator} from './profile/ProfileNavigator';
import {BubbleNavigator} from './bubble/BubbleNavigator';
import {Routes} from '../../services/navigation/Routes';
import {TabBar} from './TabBar';
import {createStackNavigator} from '@react-navigation/stack';
import {InviteModal} from './bubble/InviteModal';
import {useRoute} from '@react-navigation/native';

const BottomTabs = createBottomTabNavigator();
//const ModalStack = createStackNavigator();

export type MainTabsParamList = {
  BubbleNavigator: undefined;
  ProfileNavigator: undefined;
};

/* const Tabs: React.FC = () => {
  return (
    <BottomTabs.Navigator
      initialRouteName={Routes.Bubble}
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}
      tabBar={(props) => <TabBar {...props} />}>
      <BottomTabs.Screen name={Routes.BubbleNavigator} component={BubbleNavigator} />
      <BottomTabs.Screen name={Routes.ProfileNavigator} component={ProfileNavigator} />
    </BottomTabs.Navigator>
  );
};

const Modal: React.FC = ({navigation}) => {
  return <InviteModal visible={true} onCancel={() => navigation.goBack()} />;
}; */

export const MainNavigator = () => {
  /* return (
    <ModalStack.Navigator
      mode={'modal'}
      headerMode={'none'}
      screenOptions={{
        cardStyle: {
          backgroundColor: 'transparent',
        },
        animationEnabled: false,
      }}>
      <ModalStack.Screen name={Routes.TabsNavigator} component={Tabs} />
      <ModalStack.Screen name={Routes.Invite} component={Modal} />
    </ModalStack.Navigator>
  ); */
  return (
    <BottomTabs.Navigator
      initialRouteName={Routes.Bubble}
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}
      tabBar={(props) => <TabBar {...props} />}>
      <BottomTabs.Screen name={Routes.BubbleNavigator} component={BubbleNavigator} />
      <BottomTabs.Screen name={Routes.ProfileNavigator} component={ProfileNavigator} />
    </BottomTabs.Navigator>
  );
};
