import React from 'react';
import {Badge, Button, Footer, FooterTab, Icon, Text} from 'native-base';
import {BottomTabBarProps, createBottomTabNavigator,} from '@react-navigation/bottom-tabs';
import {OfflineButton} from './common/OfflineButton';
import {ProfileNavigator} from './profile/ProfileNavigator';
import I18n from '../i18n';
import {BubbleNavigator} from './bubble/BubbleNavigator';
import {Routes} from '../nav/Routes';

const BottomTabs = createBottomTabNavigator();

export type MainTabsParamList = {
  //InvitesNavigator: undefined;
  BubbleNavigator: undefined;
  ProfileNavigator: undefined;
};

export const MainNavigator = () => {
  return (
    <BottomTabs.Navigator tabBar={TabBar} initialRouteName={Routes.Bubble}>
      <BottomTabs.Screen name="Bubble" component={BubbleNavigator} />
      <BottomTabs.Screen name="Profile" component={ProfileNavigator} />
    </BottomTabs.Navigator>
  );
};

const TabBar: React.FC<BottomTabBarProps> = (props): JSX.Element => {
  const {state, navigation} = props;
  return (
    <Footer>
      <FooterTab style={{justifyContent: 'center', alignItems: 'center'}}>
        <Button
          vertical
          active={state.index === 0}
          onPress={() => navigation.navigate(state.routeNames[0])}>
          <Icon type="FontAwesome5" name="users" />
          <Text>{I18n.t('bubble.title')}</Text>
        </Button>
        <OfflineButton />
        <Button
          testID={'profileTab'}
          accessibilityLabel={'Profile Tab'}
          vertical
          active={state.index === 1}
          onPress={() => navigation.navigate(state.routeNames[1])}>
          <Icon type="FontAwesome5" name="user-cog" />
          <Text>{I18n.t('profile.title')}</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};
