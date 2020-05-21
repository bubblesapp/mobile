import {Reducer} from 'react';
import {ProfileAction, ProfileChangedAction,} from './actions';
import {ProfileState} from './Profile';

export type ProfileActionHandlers = {
  profileChanged: Reducer<ProfileState, ProfileChangedAction>;
};

const profileActionHandlers: ProfileActionHandlers = {
  profileChanged: (prevState, action) => {
    return action.payload;
  },
};

export type ProfileReducer = Reducer<ProfileState, ProfileAction>;
export const profileReducer: ProfileReducer = (prevState, action) => {
  switch (action.constructor) {
    case ProfileChangedAction:
      return profileActionHandlers.profileChanged(
        prevState,
        action as ProfileChangedAction,
      );
    default:
      return prevState;
  }
};
