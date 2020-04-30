import React from 'react';
import {NewOutgoingInvite} from './NewOutgoingInvite';
import {IncomingInviteList} from './IncomingInviteList';
import {OutgoingInviteList} from './OutgoingInviteList';
import {ScrollView} from 'react-native';

export const Invites: React.FC = (): JSX.Element => {
  return (
    <ScrollView>
      <NewOutgoingInvite />
      <IncomingInviteList />
      <OutgoingInviteList />
    </ScrollView>
  );
};
