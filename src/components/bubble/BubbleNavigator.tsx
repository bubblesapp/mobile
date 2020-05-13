import React from 'react';
import {Routes} from '../../nav/Routes';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MainTabsParamList} from '../MainNavigator';
import {Bubble} from './Bubble';
import {Host} from 'react-native-portalize';
import {InviteModal} from './InviteModal';
import {AlertModal} from './AlertModal';
import {Alert, Friend} from '@bubblesapp/api';
import {LogModal} from './LogModal';
import {AlertDetailsModal} from './AlertDetailsModal';

export type BubbleStackParamsList = {
  [Routes.Bubble]: undefined;
  [Routes.Invite]: undefined;
  [Routes.Alert]: undefined;
  [Routes.Log]: {
    friend: Friend,
  };
  [Routes.AlertDetails]: {
    alert: Alert,
  };
};

const BubbleStack = createStackNavigator<BubbleStackParamsList>();

export type BubbleNavigatorNavigationProp = BottomTabNavigationProp<
  MainTabsParamList,
  Routes.BubbleNavigator
>;

export const BubbleNavigator: React.FC = (): JSX.Element => {
  return (
    <Host>
      <BubbleStack.Navigator headerMode={'none'}>
        <BubbleStack.Screen name={Routes.Bubble} component={Bubble} />
        <BubbleStack.Screen name={Routes.Invite} component={InviteModal} />
        <BubbleStack.Screen name={Routes.Alert} component={AlertModal} />
        <BubbleStack.Screen name={Routes.Log} component={LogModal} />
        <BubbleStack.Screen name={Routes.AlertDetails} component={AlertDetailsModal} />
      </BubbleStack.Navigator>
    </Host>
  );
};
