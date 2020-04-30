import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import moment from 'moment';
import I18n from '../../i18n';
import {Friend, Profile} from '@bubblesapp/api';
import {useAPI} from '../../api/useAPI';
import {ListItem} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

type Props = {
  friend: Friend;
  onPress: (friend: Friend) => void;
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

export const FriendItem: React.FC<Props> = ({friend, onPress}) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  const api = useAPI();

  useEffect(() => {
    const profileSubscription = api.profiles
      .observe(friend.uid)
      .subscribe(setProfile);
    return () => profileSubscription.unsubscribe();
  }, [api, friend]);

  return (
    <ListItem
      onPress={() => onPress(friend)}
      title={
        <View style={{flexDirection: 'row', backgroundColor: '#fff'}}>
          <View
            style={{
              width: 64,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#007aff',
              borderRadius: 32,
            }}>
            <FontAwesome5
              name={'user-alt'}
              style={{color: '#fff', textAlign: 'center', fontSize: 24}}
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
            <Text style={{fontWeight: '500'}} numberOfLines={1}>
              {profile?.name}
            </Text>
            <Text style={{color: '#a0a0a0', fontSize: 14}} numberOfLines={1}>
              {profile?.email}
            </Text>
            <Text style={{fontSize: 14}} numberOfLines={1}>
              {daysAgoString(friend.lastMet)}
            </Text>
          </View>
        </View>
      }
    />
  );
};
