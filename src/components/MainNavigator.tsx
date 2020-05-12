import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProfileNavigator} from './profile/ProfileNavigator';
import {BubbleNavigator} from './bubble/BubbleNavigator';
import {Routes} from '../nav/Routes';
import I18n from '../i18n';
import {TabBar} from './TabBar';
import {createStackNavigator} from '@react-navigation/stack';
import {InviteModal} from './bubble/InviteModal';
import {Bubble} from './bubble/Bubble';

const BottomTabs = createBottomTabNavigator();
const ModalStack = createStackNavigator();

export type MainTabsParamList = {
  BubbleNavigator: undefined;
  ProfileNavigator: undefined;
};

const Tabs: React.FC = () => {
  return (
    <BottomTabs.Navigator
      initialRouteName={Routes.Bubble}
      tabBar={(props) => <TabBar {...props} />}>
      <BottomTabs.Screen
        name={I18n.t('bubble.title')}
        component={Bubble}
      />
      <BottomTabs.Screen
        name={I18n.t('profile.title')}
        component={ProfileNavigator}
      />
    </BottomTabs.Navigator>
  );
};

const Modal: React.FC = ({navigation}) => {
  return <InviteModal visible={true} onCancel={() => navigation.goBack()} />;
};

export const MainNavigator = () => {
  return (
    <ModalStack.Navigator
      mode={'modal'}
      headerMode={'none'}
      screenOptions={{
        cardStyle: {
          backgroundColor: 'transparent',
        },
        animationEnabled: false,
      }}>
      <ModalStack.Screen name={'Dummy'} component={Tabs} />
      <ModalStack.Screen name={Routes.Invite} component={Modal} />
    </ModalStack.Navigator>
  );
};
