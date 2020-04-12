import React from 'react';
import {Routes} from '../../nav/Routes';
import {createStackNavigator, Header} from '@react-navigation/stack';
import {Invites} from '../invites/Invites';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MainTabsParamList} from '../MainNavigator';
import {Bubble} from './Bubble';

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
    <BubbleStack.Navigator>
      <BubbleStack.Screen name={Routes.Bubble} component={Bubble} />
      <BubbleStack.Screen name={Routes.Invites} component={Invites} />
    </BubbleStack.Navigator>
  );
};
