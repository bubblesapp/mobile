import I18n from '../../i18n';
import React from 'react';
import {Profile} from '@bubblesapp/api';
import {ListItem} from 'react-native-elements';

type Props = {
  profile: Profile;
};

export const EmailNotifications: React.FC<Props> = ({profile}) => {
  const switchEmailNotifications = (enabled: boolean) => {
    console.log('Email notifications', enabled);
  };

  return (
    <ListItem
      title={I18n.t('profile.emailNotifications')}
      switch={{
        value: profile?.emailNotificationsEnabled,
        onValueChange: (enabled) => switchEmailNotifications(enabled),
      }}
    />
  );
};
