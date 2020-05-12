import React from 'react';
import {SignIn} from './SignIn';
import {ForgotPassword} from './ForgotPassword';
import {SignUp} from './SignUp';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from '../../nav/Routes';
import {ConfirmSignUp} from './ConfirmSignUp';
import {ResetPasswordEmailSent} from './ResetPasswordEmailSent';
import {ScrollView, ViewStyle, StyleSheet} from 'react-native';
import {Onboarding} from '../../onboarding/Onboarding';
import {SignUpNext} from './SignUpNext';
import {DynamicLinkHandler} from '../../nav/DynamicLinkHandler';

export type AuthStackParamList = {
  Onboarding: undefined;
  SignIn: {
    email?: string;
    signUpConfirmed?: boolean;
  };
  SignUp: undefined;
  SignUpNext: undefined;
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

  return (
    <ScrollView
      alwaysBounceVertical={false}
      contentContainerStyle={styles.contentContainer}>
      <AuthStack.Navigator
        headerMode={'none'}
        initialRouteName={'Onboarding'}
        screenOptions={screenOptions}>
        <AuthStack.Screen name="Onboarding" component={Onboarding} />
        <AuthStack.Screen name={Routes.SignIn} component={SignIn} />
        <AuthStack.Screen name={Routes.SignUp} component={SignUp} />
        <AuthStack.Screen name={Routes.SignUpNext} component={SignUpNext} />
        <AuthStack.Screen
          name={Routes.ConfirmSignUp}
          component={ConfirmSignUp}
        />
        <AuthStack.Screen
          name={Routes.ForgotPassword}
          component={ForgotPassword}
        />
        <AuthStack.Screen
          name={Routes.ResetPasswordEmailSent}
          component={ResetPasswordEmailSent}
        />
      </AuthStack.Navigator>
    </ScrollView>
  );
};

type Styles = {
  contentContainer: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
