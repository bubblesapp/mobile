import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Friend} from '../../models/Friend';
import moment from 'moment';
import {Icon, Text} from 'native-base';
import I18n from '../../i18n';
import {Profile} from '../../models/Profile';

type Props = {
  friend: Friend;
};

const daysAgoString = (timestamp: number | undefined): string => {
  if (!timestamp) {
    return I18n.t('bubble.friends.notMetYet');
  }
  const days = moment().diff(moment(timestamp).startOf('day'), 'days');
  switch (days) {
    case 0:
      return I18n.t('bubble.friends.lastMetToday');
    case 1:
      return I18n.t('bubble.friends.lastMetYesterday');
    default:
      return I18n.t('bubble.friends.lastMetXDaysAgo').replace('$0', days);
  }
};

export const FriendItem: React.FC<Props> = ({friend}) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const profileSubscription = friend.profile.subscribe(setProfile);
    return () => profileSubscription.unsubscribe();
  }, [friend.profile]);

  return (
    <View style={{flexDirection: 'row', backgroundColor: '#fff'}}>
      <View
        style={{
          width: 64,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#007aff',
          borderRadius: 32,
        }}>
        <Icon
          name={'user-alt'}
          type={'FontAwesome5'}
          style={{color: '#fff', textAlign: 'center'}}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          alignItems: 'flex-start',
          height: 64,
          marginLeft: 16,
        }}>
        <Text style={{fontWeight: '500'}} numberOfLines={1}>{profile?.name}</Text>
        <Text style={{color: '#a0a0a0', fontSize: 14}} numberOfLines={1}>{profile?.email}</Text>
        <Text style={{fontSize: 14}} numberOfLines={1}>{daysAgoString(friend.lastMet)}</Text>
      </View>
    </View>
  );
};
