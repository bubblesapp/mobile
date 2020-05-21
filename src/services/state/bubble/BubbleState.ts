import {Alert, Friend, Invite} from '@bubblesapp/api';

export type BubbleState = {
  friends: Friend[];
  outgoingInvites: Invite[];
  incomingInvites: Invite[];
  alerts: Alert[];
};
