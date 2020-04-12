import {Profile} from './Profile';
import {Observable} from 'rxjs';

export type Invite = {
  from: string;
  to: string;
  createdAt: number;
  accepted?: boolean;
  profile?: Observable<Profile>;
};
