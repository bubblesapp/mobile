import React from 'react';
import {Routes} from '../../../services/navigation/Routes';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MainTabsParamList} from '../MainNavigator';
import {Bubble} from './Bubble';
import {InviteModal} from './InviteModal';
import {AlertModal} from './AlertModal';
import {LogModal} from './LogModal';
import {AlertDetailsModal} from './AlertDetailsModal';

export type BubbleStackParamsList = {
  [Routes.Bubble]: {
    tab: string;
  };
  [Routes.Invite]: undefined;
  [Routes.Alert]: undefined;
  [Routes.Log]: {
    uid: string;
  };
  [Routes.AlertDetails]: {
    id: string;
  };
};

const BubbleStack = createStackNavigator<BubbleStackParamsList>();

export type BubbleNavigatorNavigationProp = BottomTabNavigationProp<
  MainTabsParamList,
  Routes.BubbleNavigator
>;

export const BubbleNavigator: React.FC = (): JSX.Element => {
  return (
    <BubbleStack.Navigator
      initialRouteName={Routes.Bubble}
      headerMode={'none'}
      screenOptions={{
        cardStyle: {
          borderRadius: 0,
        },
      }}>
      <BubbleStack.Screen name={Routes.Bubble} initialParams={{tab: 'people'}} component={Bubble} />
      <BubbleStack.Screen name={Routes.Invite} component={InviteModal} />
      <BubbleStack.Screen name={Routes.Alert} component={AlertModal} />
      <BubbleStack.Screen name={Routes.Log} component={LogModal} />
      <BubbleStack.Screen
        name={Routes.AlertDetails}
        component={AlertDetailsModal}
      />
    </BubbleStack.Navigator>
  );
};
