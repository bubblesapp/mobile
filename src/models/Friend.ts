import {Observable} from 'rxjs';
import {Profile} from './Profile';

export type Friend = {
  uid: string;
  lastMet?: number;
  profile: Observable<Profile>;
};
