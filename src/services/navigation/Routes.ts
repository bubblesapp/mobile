import {LinkingOptions} from '@react-navigation/native/lib/typescript/src/types';
import ExpoConstants from 'expo-constants';

export enum Routes {
  // Auth flow
  AuthNavigator = 'AuthNavigator',
  Onboarding = 'Onboarding',
  SignUp = 'SignUp',
  Setup = 'Setup',
  SignIn = 'SignIn',
  ForgotPassword = 'ForgotPassword',
  ResetPasswordEmailSent = 'ResetPasswordEmailSent',
  ConfirmResetPassword = 'ConfirmResetPassword',

  // Main Navigator, showing modals on top of tabs
  MainNavigator = 'MainNavigator',

  // Modals
  Invite = 'Invite',
  Alert = 'Alert',
  AlertDetails = 'AlertDetails',
  Log = 'Log',

  // Tabs
  TabsNavigator = 'TabsNavigator',

  // Bubble tab
  BubbleNavigator = 'BubbleNavigator',
  Bubble = 'Bubble',

  // Profile tab
  ProfileNavigator = 'ProfileNavigator',
  Profile = 'Profile',
  ChangeEmail = 'ChangeEmail',
  ChangePassword = 'ChangePassword',
  ChangePersonalInfo = 'ChangePersonalInfo',
  LegalInfo = 'LegalInfo',
  DeleteAccount = 'DeleteAccount',
}

export const linking: LinkingOptions = {
  prefixes: [ExpoConstants.manifest.extra.baseUrl],
  config: {
    [Routes.AuthNavigator]: {
      initialRouteName: Routes.SignIn,
      path: 'auth',
      screens: {
        [Routes.Onboarding]: {
          path: 'welcome',
        },
        [Routes.SignIn]: {
          path: 'sign-in',
        },
        [Routes.SignUp]: {
          path: 'sign-up',
        },
        [Routes.Setup]: {
          path: 'setup',
        },
        [Routes.ForgotPassword]: {
          path: 'forgot-password',
        },
        [Routes.ResetPasswordEmailSent]: {
          path: 'reset-password-email-sent',
        },
      },
    },
    [Routes.MainNavigator]: {
      initialRouteName: Routes.BubbleNavigator,
      path: 'main',
      screens: {
        [Routes.BubbleNavigator]: {
          initialRouteName: Routes.Bubble,
          path: 'bubble',
          screens: {
            [Routes.Bubble]: {
              path: '/:tab',
            },
            [Routes.Invite]: {
              path: 'invite',
            },
            [Routes.Log]: {
              path: 'people/:uid',
            },
            [Routes.Alert]: {
              path: 'new-alert',
            },
            [Routes.AlertDetails]: {
              path: 'alerts/:id',
            },
          },
        },
        [Routes.ProfileNavigator]: {
          initialRouteName: Routes.Profile,
          path: 'profile',
          screens: {
            [Routes.Profile]: {
              path: '/',
            },
            [Routes.ChangeEmail]: {
              path: 'email',
            },
            [Routes.ChangePassword]: {
              path: 'password',
            },
            [Routes.ChangePersonalInfo]: {
              path: 'name',
            },
            [Routes.LegalInfo]: {
              path: 'legal',
            },
            [Routes.DeleteAccount]: {
              path: 'delete-account',
            },
          },
        },
      },
    },
  },
};
