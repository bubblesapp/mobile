import I18n from '../../../services/i18n';
import React from 'react';
import {Profile} from '@bubblesapp/api';
import {ListItem} from 'react-native-elements';
import {profileStyles as styles} from './Styles';
import {ItemIcon} from './ItemIcon';
import Bell from '../../../../assets/images/profile/Bell.png';

type Props = {
  profile: Profile;
};

export const EmailNotifications: React.FC<Props> = ({profile}) => {
  const switchEmailNotifications = (enabled: boolean) => {
    console.log('Email notifications', enabled);
  };

  return (
    <ListItem
      containerStyle={styles.itemContainer}
      leftIcon={<ItemIcon imageSource={Bell} />}
      title={I18n.t('profile.emailNotifications')}
      titleStyle={styles.itemTitle}
      subtitle={I18n.t('profile.comingSoon')}
      subtitleStyle={styles.itemSubtitle}
      disabled={true}
      disabledStyle={{opacity: 0.5}}
      bottomDivider={true}
      switch={{
        style: {opacity: 0.2},
        value: profile?.emailNotificationsEnabled,
        onValueChange: (enabled) => switchEmailNotifications(enabled),
      }}
    />
  );
};
