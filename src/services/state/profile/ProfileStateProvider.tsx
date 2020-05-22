import React, {useEffect, useReducer} from 'react';
import {profileReducer, ProfileReducer} from './reducer';
import {useAPI} from '../../api/useAPI';
import {useAuth} from '../../auth/useAuth';
import {ProfileChangedAction} from './actions';
import {ProfileState} from './Profile';

const initialProfileState: ProfileState = undefined;

export const ProfileContext = React.createContext<ProfileState>(
  initialProfileState,
);

export const ProfileStateProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer<ProfileReducer>(
    profileReducer,
    initialProfileState,
  );
  const api = useAPI();
  const auth = useAuth();

  useEffect(() => {
    const profileSubscription = api.profiles.observe().subscribe((profile) => {
      dispatch(new ProfileChangedAction(profile));
    });
    return () => profileSubscription.unsubscribe();
  }, [auth.state.uid, api]);

  return <ProfileContext.Provider value={state} {...props} />;
};
