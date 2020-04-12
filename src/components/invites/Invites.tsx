import React from 'react';
import {Container, Content} from 'native-base';
import {NewOutgoingInvite} from './NewOutgoingInvite';
import {IncomingInviteList} from './IncomingInviteList';
import {OutgoingInviteList} from './OutgoingInviteList';

export const Invites: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Content padder>
        <NewOutgoingInvite />
        <IncomingInviteList />
        <OutgoingInviteList />
      </Content>
    </Container>
  );
};
