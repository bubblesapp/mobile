import React from 'react';
import {SignIn} from './SignIn';
import {ForgotPassword} from './ForgotPassword';
import {SignUp} from './SignUp';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from '../../services/navigation/Routes';
import {ResetPasswordEmailSent} from './ResetPasswordEmailSent';
import {Onboarding} from './Onboarding';
import {Setup} from './Setup';
import {useAsyncStorage} from '../../services/util/useAsyncStorage';

export type AuthStackParamList = {
  Onboarding: undefined;
  SignIn: {
    email?: string;
    signUpConfirmed?: boolean;
  };
  SignUp: undefined;
  Setup: undefined;
  ConfirmSignUp: {
    email?: string;
    password?: string;
  };
  ForgotPassword: {
    email?: string;
  };
  ResetPasswordEmailSent: {
    email?: string;
  };
};

const AuthStack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = (): JSX.Element => {
  const screenOptions = {
    cardStyle: {
      backgroundColor: 'transparent',
    },
    animationEnabled: false,
  };

  const [onboarded] = useAsyncStorage('onboarded', false);

  console.log('Onboarded', onboarded);

  return (
    <AuthStack.Navigator headerMode={'none'} screenOptions={screenOptions}>
      {!onboarded && (
        <AuthStack.Screen name={Routes.Onboarding} component={Onboarding} />
      )}
      <AuthStack.Screen name={Routes.SignIn} component={SignIn} />
      <AuthStack.Screen name={Routes.SignUp} component={SignUp} />
      <AuthStack.Screen name={Routes.Setup} component={Setup} />
      <AuthStack.Screen
        name={Routes.ForgotPassword}
        component={ForgotPassword}
      />
      <AuthStack.Screen
        name={Routes.ResetPasswordEmailSent}
        component={ResetPasswordEmailSent}
      />
    </AuthStack.Navigator>
  );
};
