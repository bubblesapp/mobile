import {Reducer} from 'react';
import {
  AlertsChangedAction,
  BubbleAction,
  FriendsChangedAction,
  IncomingInvitesChangedAction,
  OutgoingInvitesChangedAction,
} from './actions';
import {BubbleState} from './Bubble';

export type BubbleActionHandlers = {
  friendsChanged: Reducer<BubbleState, FriendsChangedAction>;
  incomingInvitesChanged: Reducer<BubbleState, IncomingInvitesChangedAction>;
  outgoingInvitesChanged: Reducer<BubbleState, OutgoingInvitesChangedAction>;
  alertsChanged: Reducer<BubbleState, AlertsChangedAction>;
};

const bubbleActionHandlers: BubbleActionHandlers = {
  friendsChanged: (prevState, action) => {
    return {
      ...prevState,
      friends: action.payload,
    };
  },
  incomingInvitesChanged: (prevState, action) => {
    return {
      ...prevState,
      incomingInvites: action.payload,
    };
  },
  outgoingInvitesChanged: (prevState, action) => {
    return {
      ...prevState,
      outgoingInvites: action.payload,
    };
  },
  alertsChanged: (prevState, action) => {
    return {
      ...prevState,
      alerts: action.payload,
    };
  },
};

export type BubbleReducer = Reducer<BubbleState, BubbleAction>;
export const bubbleReducer: BubbleReducer = (prevState, action) => {
  switch (action.constructor) {
    case FriendsChangedAction:
      return bubbleActionHandlers.friendsChanged(
        prevState,
        action as FriendsChangedAction,
      );
    case IncomingInvitesChangedAction:
      return bubbleActionHandlers.incomingInvitesChanged(
        prevState,
        action as IncomingInvitesChangedAction,
      );
    case OutgoingInvitesChangedAction:
      return bubbleActionHandlers.outgoingInvitesChanged(
        prevState,
        action as OutgoingInvitesChangedAction,
      );
    case AlertsChangedAction:
      return bubbleActionHandlers.alertsChanged(
        prevState,
        action as AlertsChangedAction,
      );
    default:
      return prevState;
  }
};
