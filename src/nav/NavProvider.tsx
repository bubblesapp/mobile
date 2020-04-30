import React from 'react';
import {NavContext} from './useNav';
import {useNavigation} from '@react-navigation/native';

export enum Routes {
  AuthNavigator = 'AuthNavigator',
  SignUp = 'SignUp',
  ConfirmSignUp = 'ConfirmSignUp',
  SignIn = 'SignIn',
  ResetPassword = 'ResetPassword',
  ConfirmResetPassword = 'ConfirmResetPassword',

  MainNavigator = 'MainNavigator',

  BubbleNavigator = 'BubbleNavigator',
  Bubble = 'Bubble',

  //InvitesNavigator = 'InvitesNavigator',
  Invites = 'Invites',

  ProfileNavigator = 'ProfileNavigator',
  Profile = 'Profile',
  ChangeEmail = 'ChangeEmail',
  ChangePassword = 'ChangePassword',
  ChangePersonalInfo = 'ChangePersonalInfo',
  DeleteAccount = 'DeleteAccount',
}

export const NavProvider: React.FC = (props): JSX.Element => {
  const navigation = useNavigation();
  const nav = {
    navigate: (to: string) => {
      navigation.navigate(to);
    },
    goBack: () => navigation.goBack(),
  };
  return <NavContext.Provider value={nav} {...props} />;
};
