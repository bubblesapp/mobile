import React from 'react';
import {Routes} from '../../nav/Routes';
import {createStackNavigator} from '@react-navigation/stack';
import {Profile} from './Profile';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MainTabsParamList} from '../MainNavigator';
import {ChangeEmail} from './ChangeEmail';
import {ChangePassword} from './ChangePassword';
import {ChangePersonalInfo} from './ChangePersonalInfo';
import {DeleteAccount} from './DeleteAccount';
import I18n from '../../i18n';
import {BackButton} from './BackButton';

export type ProfileStackParamsList = {
  [Routes.Profile]: undefined;
  [Routes.ChangeEmail]: undefined;
  [Routes.ChangePassword]: undefined;
  [Routes.ChangePersonalInfo]: undefined;
  [Routes.DeleteAccount]: undefined;
};

const ProfileStack = createStackNavigator<ProfileStackParamsList>();

export type ProfileNavigatorNavigationProp = BottomTabNavigationProp<
  MainTabsParamList,
  Routes.ProfileNavigator
>;

export const ProfileNavigator: React.FC = (): JSX.Element => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={Routes.Profile}
        component={Profile}
        options={{
          title: I18n.t('profile.title'),
        }}
      />
      <ProfileStack.Screen
        name={Routes.ChangeEmail}
        component={ChangeEmail}
        options={{
          title: I18n.t('profile.changeEmail.title'),
        }}
      />
      <ProfileStack.Screen
        name={Routes.ChangePassword}
        component={ChangePassword}
        options={{
          title: I18n.t('profile.changePassword.title'),
          headerLeft: () => <BackButton />,
        }}
      />
      <ProfileStack.Screen
        name={Routes.ChangePersonalInfo}
        component={ChangePersonalInfo}
        options={{
          title: I18n.t('profile.changePersonalInfo.title'),
          headerLeft: () => <BackButton />,
        }}
      />
      <ProfileStack.Screen
        name={Routes.DeleteAccount}
        component={DeleteAccount}
        options={{
          title: I18n.t('profile.deleteAccount.title'),
          headerLeft: () => <BackButton />,
        }}
      />
    </ProfileStack.Navigator>
  );
};
