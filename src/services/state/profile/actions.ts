import {Action} from '../Action';
import {Profile} from '@bubblesapp/api';

export class ProfileChangedAction extends Action<Profile | undefined> {
  constructor(public payload: Profile | undefined) {
    super();
  }
}

export type ProfileAction = ProfileChangedAction;
