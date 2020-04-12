import React, {useEffect, useState} from 'react';
import {Text, View, TouchableHighlight} from 'react-native';
import {Invite} from '../../models/Invite';
import {CardItem, Icon} from 'native-base';
import {Profile} from '../../models/Profile';

type Props = {
  invite: Invite;
  onPress: (inviterName: string | undefined) => void;
};

export const IncomingInviteItem: React.FC<Props> = ({invite, onPress}) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const profileSubscription = invite.profile?.subscribe(setProfile);
    return () => profileSubscription?.unsubscribe();
  }, [invite.profile]);

  return (
    <TouchableHighlight onPress={() => onPress(profile?.name)}>
      <CardItem bordered={true}>
        <View style={{flexDirection: 'row', backgroundColor: '#fff'}}>
          <View
            style={{
              width: 48,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#007aff',
              borderRadius: 24,
            }}>
            <Icon
              name={'envelope-open'}
              type={'FontAwesome'}
              style={{color: '#fff', textAlign: 'center', fontSize: 20}}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-evenly',
              alignItems: 'flex-start',
              height: 48,
              marginLeft: 16,
            }}>
            <Text style={{fontSize: 14, fontWeight: 'bold'}} numberOfLines={1}>{profile?.name}</Text>
            <Text style={{fontSize: 14, color: '#aaa'}} numberOfLines={1}>{profile?.email}</Text>
          </View>
          <View
            style={{
              width: 64,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name={'reply'}
              type={'FontAwesome'}
              style={{color: '#ccc', textAlign: 'center'}}
            />
          </View>
        </View>
      </CardItem>
    </TouchableHighlight>
  );
};
