import React from 'react';
import {Profile} from '@bubblesapp/api';
import {EmailNotifications} from './EmailNotifications';

type Props = {
  profile?: Profile;
};

export const Notifications: React.FC<Props> = ({profile}) => {
  if (!profile) {
    return null;
  }

  return (
    <>
      <EmailNotifications profile={profile} />
    </>
  );
};
