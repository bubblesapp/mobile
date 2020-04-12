import {Reducer} from 'react';
import {AuthState} from './state';
import {
  AuthAction,
  AuthStateChangedAction,
  SetVerifyingEmailAction,
} from './actions';

export type AuthActionHandlers = {
  authStateChanged: Reducer<AuthState, AuthStateChangedAction>;
  setVerifyingEmail: Reducer<AuthState, SetVerifyingEmailAction>;
};

const authActionHandlers: AuthActionHandlers = {
  authStateChanged: (prevState, action) => {
    return action.payload;
  },
  setVerifyingEmail: (prevState, action) => {
    return {
      ...prevState,
      verifyingEmail: action.payload,
    };
  },
};

export type AuthReducer = Reducer<AuthState, AuthAction>;
export const authReducer: AuthReducer = (prevState, action) => {
  switch (action.constructor) {
    case AuthStateChangedAction:
      return authActionHandlers.authStateChanged(
        prevState,
        action as AuthStateChangedAction,
      );
    case SetVerifyingEmailAction:
      return authActionHandlers.setVerifyingEmail(
        prevState,
        action as SetVerifyingEmailAction,
      );
    default:
      return prevState;
  }
};
