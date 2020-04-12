import {Invite} from '../../models/Invite';
import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAPI} from '../../api/useAPI';
import {ActionSheet, Card, CardItem, Text} from 'native-base';
import I18n from '../../i18n';
import {OutgoingInviteItem} from './OutgoingInviteItem';
import Toast from '../common/Toast';
import {useNetInfo} from '@react-native-community/netinfo';

const BUTTONS = [
  I18n.t('bubble.invites.deleteOutgoing'),
  I18n.t('bubble.invites.cancel'),
];
const DESTRUCTIVE_INDEX = 0;
const CANCEL_INDEX = 1;

export const OutgoingInviteList: React.FC = (): JSX.Element | null => {
  const [invites, setInvites] = useState<Invite[]>([]);
  const API = useAPI();
  const netInfo = useNetInfo();

  console.log(invites);

  useEffect(() => {
    const invitesSubscription = API.observeOutgoingInvites().subscribe(
      setInvites,
    );
    return () => invitesSubscription.unsubscribe();
  }, [API]);

  if (invites.length === 0) {
    return null;
  }

  const deleteOutgoingInvite = async (toEmail: string) => {
    try {
      if (netInfo.isInternetReachable) {
        await API.cancelInvite(toEmail);
      } else {
        API.cancelInvite(toEmail).catch((err) => {
          console.log(err);
        });
      }
    } catch (err) {
      Toast.danger(err.message);
    }
  };

  const showActionSheet = (toEmail: string) => {
    ActionSheet.show(
      {
        options: BUTTONS,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        cancelButtonIndex: CANCEL_INDEX,
        title: I18n.t('bubble.invites.deleteOutgoing'),
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          await deleteOutgoingInvite(toEmail);
        }
      },
    );
  };

  return (
    <Card>
      <FlatList<Invite>
        data={invites}
        ListHeaderComponent={
          <CardItem header={true}>
            <Text>{I18n.t('bubble.invites.outgoingInvites')}</Text>
          </CardItem>
        }
        renderItem={({item: invite}) => (
          <OutgoingInviteItem
            invite={invite}
            onPress={(toEmail: string) => showActionSheet(toEmail)}
          />
        )}
        keyExtractor={(invite, index) => invite.from + invite.to + index}
      />
    </Card>
  );
};
