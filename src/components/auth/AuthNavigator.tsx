import React from 'react';
import {SignIn} from './SignIn';
import {ResetPassword} from './ResetPassword';
import {SignUp} from './SignUp';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from '../../nav/Routes';
import {ConfirmSignUp} from './ConfirmSignUp';
import {ConfirmResetPassword} from './ConfirmResetPassword';
import {ScrollView, ViewStyle, StyleSheet} from 'react-native';

export type AuthStackParamList = {
  SignIn: {
    email?: string;
    signUpConfirmed?: boolean;
  };
  SignUp: undefined;
  ConfirmSignUp: {
    email?: string;
    password?: string;
  };
  ResetPassword: {
    email?: string;
  };
  ConfirmResetPassword: {
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
        initialRouteName={Routes.SignIn}
        screenOptions={screenOptions}>
        <AuthStack.Screen name={Routes.SignIn} component={SignIn} />
        <AuthStack.Screen name={Routes.SignUp} component={SignUp} />
        <AuthStack.Screen name={Routes.ConfirmSignUp} component={ConfirmSignUp} />
        <AuthStack.Screen name={Routes.ResetPassword} component={ResetPassword} />
        <AuthStack.Screen
          name={Routes.ConfirmResetPassword}
          component={ConfirmResetPassword}
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
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
});
