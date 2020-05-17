import {Friend, Invite} from '@bubblesapp/api';

export type Person = {
  key: string;
  type: 'friend' | 'incoming' | 'outgoing';
  item: Friend | Invite;
};
