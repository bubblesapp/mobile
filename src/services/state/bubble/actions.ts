import {Alert, Friend, Invite, Profile} from '@bubblesapp/api';
import {Action} from '../Action';

export class FriendsChangedAction extends Action<Friend[]> {
  constructor(public payload: Friend[]) {
    super();
  }
}

export class IncomingInvitesChangedAction extends Action<Invite[]> {
  constructor(public payload: Invite[]) {
    super();
  }
}

export class OutgoingInvitesChangedAction extends Action<Invite[]> {
  constructor(public payload: Invite[]) {
    super();
  }
}

export class AlertsChangedAction extends Action<Alert[]> {
  constructor(public payload: Alert[]) {
    super();
  }
}

export type BubbleAction =
  | FriendsChangedAction
  | IncomingInvitesChangedAction
  | OutgoingInvitesChangedAction
  | AlertsChangedAction;
