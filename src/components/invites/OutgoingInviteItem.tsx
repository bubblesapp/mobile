import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {Invite} from '../../models/Invite';
import I18n from '../../i18n';
import {ListItem} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type Props = {
  invite: Invite;
  onPress: (toEmail: string) => void;
};

export const OutgoingInviteItem: React.FC<Props> = ({invite, onPress}) => {
  return (
    <TouchableHighlight onPress={() => onPress(invite.to)}>
      <View style={{flexDirection: 'row', backgroundColor: '#fff'}}>
        <View
          style={{
            width: 48,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ccc',
            borderRadius: 24,
          }}>
          <FontAwesome
            name={'envelope'}
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
          <Text style={{fontSize: 14}} numberOfLines={1}>
            {I18n.t('bubble.invites.youInvited')}
          </Text>
          <Text style={{fontWeight: '500'}} numberOfLines={1}>{invite?.to}</Text>
        </View>
        <View
          style={{
            width: 64,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesome
            name={'trash'}
            style={{color: '#ccc', textAlign: 'center'}}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};
