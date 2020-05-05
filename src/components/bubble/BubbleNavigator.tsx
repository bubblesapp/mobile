import React from 'react';
import {Routes} from '../../nav/Routes';
import {createStackNavigator} from '@react-navigation/stack';
import {Invites} from '../invites/Invites';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MainTabsParamList} from '../MainNavigator';
import {Bubble} from './Bubble';
import {InviteButton} from './InviteButton';
import I18n from '../../i18n';
import {ScrollView} from 'react-native';

export type BubbleStackParamsList = {
  [Routes.Bubble]: undefined;
  [Routes.Invites]: undefined;
};

const BubbleStack = createStackNavigator<BubbleStackParamsList>();

export type BubbleNavigatorNavigationProp = BottomTabNavigationProp<
  MainTabsParamList,
  Routes.BubbleNavigator
>;

export const BubbleNavigator: React.FC = (): JSX.Element => {
  return (
    <BubbleStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <BubbleStack.Screen
        name={Routes.Bubble}
        component={Bubble}
        options={{
          title: I18n.t('bubble.title'),
          headerRight: () => <InviteButton />,
        }}
      />
      <BubbleStack.Screen name={Routes.Invites} component={Invites} />
    </BubbleStack.Navigator>
  );
};
