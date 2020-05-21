import React, {useEffect, useReducer} from 'react';
import {bubbleReducer, BubbleReducer} from './reducer';
import {API} from '@bubblesapp/api';
import {BubbleState} from './Bubble';
import {Analytics} from '../../analytics/Analytics';
import {useAPI} from '../../api/useAPI';
import {useAuth} from '../../auth/useAuth';
import {
  AlertsChangedAction,
  FriendsChangedAction,
  IncomingInvitesChangedAction,
  OutgoingInvitesChangedAction
} from './actions';

const initialBubbleState: BubbleState = {
  friends: [],
  incomingInvites: [],
  outgoingInvites: [],
  alerts: [],
};

export const BubbleContext = React.createContext<BubbleState>(
  initialBubbleState,
);

export const BubbleStateProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer<BubbleReducer>(
    bubbleReducer,
    initialBubbleState,
  );
  const api = useAPI();
  const auth = useAuth();

  useEffect(() => {
    const friendsSubscription = api.friends
      .observeAll()
      .subscribe((friends) => {
        Analytics.set('people_count', friends.length);
        dispatch(new FriendsChangedAction(friends));
      });
    return () => friendsSubscription.unsubscribe();
  }, [auth.state.uid, api]);

  useEffect(() => {
    const outgoingInvitesSubscription = api.invites.outgoing
      .observeAll()
      .subscribe((outgoingInvites) => {
        dispatch(new OutgoingInvitesChangedAction(outgoingInvites));
      });
    return () => outgoingInvitesSubscription.unsubscribe();
  }, [auth.state.uid, api]);

  useEffect(() => {
    const incomingInvitesSubscription = api.invites.incoming
      .observeAll()
      .subscribe((incomingInvites) => {
        dispatch(new IncomingInvitesChangedAction(incomingInvites));
      });
    return () => incomingInvitesSubscription.unsubscribe();
  }, [auth.state.uid, api]);

  useEffect(() => {
    const alertsSubscription = api.alerts.observeAll().subscribe((alerts) => {
      Analytics.set('alert_count', alerts.length);
      dispatch(new AlertsChangedAction(alerts));
    });
    return () => alertsSubscription.unsubscribe();
  }, [auth.state.uid, api]);

  return <BubbleContext.Provider value={state} {...props} />;
};
