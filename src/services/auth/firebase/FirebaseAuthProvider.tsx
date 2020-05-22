import React, {useEffect, useMemo, useReducer,} from 'react';
import {authReducer, AuthReducer} from '../state/reducer';
import {useAPI} from '../../api/useAPI';
import {AuthContext} from '../useAuth';
import {firebaseApp} from '../../api/firebase/firebaseApp';
import {FirebaseAuth} from './FirebaseAuth';

export const FirebaseAuthProvider: React.FC = (props): JSX.Element => {
  const [state, dispatch] = useReducer<AuthReducer>(authReducer, {});

  const api = useAPI();

  const auth = useMemo<FirebaseAuth>(
    () => new FirebaseAuth(state, dispatch, api, firebaseApp),
    [state, dispatch],
  );

  useEffect(() => {
    auth.registerAuthStateChangeHandler();
  }, []);

  return <AuthContext.Provider value={auth} {...props} />;
};
