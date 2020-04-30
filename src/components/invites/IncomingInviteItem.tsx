import React, {useEffect, useState} from 'react';
import {Text, View, TouchableHighlight} from 'react-native';
import {useAPI} from '../../api/useAPI';
import {Invite, Profile} from '@bubblesapp/api';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type Props = {
  invite: Invite;
  onPress: (inviterName: string | undefined) => void;
};

export const IncomingInviteItem: React.FC<Props> = ({invite, onPress}) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const api = useAPI();

  useEffect(() => {
    const profileSubscription = api.profiles
      .observe(invite.from)
      .subscribe(setProfile);
    return () => profileSubscription?.unsubscribe();
  }, [api, invite]);

  return (
    <TouchableHighlight onPress={() => onPress(profile?.name)}>
      <View style={{flexDirection: 'row', backgroundColor: '#fff'}}>
        <View
          style={{
            width: 48,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#007aff',
            borderRadius: 24,
          }}>
          <FontAwesome
            name={'envelope-open'}
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
          <FontAwesome
            name={'reply'}
            style={{color: '#ccc', textAlign: 'center'}}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};
