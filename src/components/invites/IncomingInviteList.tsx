import {Invite} from '../../models/Invite';
import React, {useEffect, useState} from 'react';
import {useAPI} from '../../api/useAPI';
import {ActionSheet, Card, CardItem, Text} from 'native-base';
import I18n from '../../i18n';
import {IncomingInviteItem} from './IncomingInviteItem';
import Toast from '../common/Toast';
import {FlatList} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';

const BUTTONS = [
  I18n.t('bubble.invites.accept'),
  I18n.t('bubble.invites.decline'),
  I18n.t('bubble.invites.cancel'),
];
const DESTRUCTIVE_INDEX = 1;
const CANCEL_INDEX = 2;

export const IncomingInviteList: React.FC = (): JSX.Element | null => {
  const [invites, setInvites] = useState<Invite[]>([]);
  const API = useAPI();
  const netInfo = useNetInfo();

  useEffect(() => {
    const invitesSubscription = API.observeIncomingInvites().subscribe(
      setInvites,
    );
    return () => invitesSubscription.unsubscribe();
  }, [API]);

  if (invites.length === 0) {
    return null;
  }

  const acceptInvite = async (
    fromUid: string,
    inviterName: string | undefined,
  ) => {
    try {
      if (netInfo.isInternetReachable) {
        await API.acceptInvite(fromUid);
      } else {
        API.acceptInvite(fromUid).catch(async (err) => {
          console.log(err);
          await API.removeFriend(fromUid);
        });
      }
      if (inviterName) {
        Toast.success(
          I18n.t('bubble.invites.acceptSuccess').replace('$0', inviterName),
        );
      }
    } catch (err) {
      Toast.danger(err.message);
    }
  };

  const declineInvite = async (fromUid: string) => {
    try {
      await API.declineInvite(fromUid);
    } catch (err) {
      Toast.danger(err.message);
    }
  };

  const showActionSheet = (
    inviterName: string | undefined,
    fromUid: string,
    onCancel?: () => void,
  ) => {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: inviterName
          ? I18n.t('bubble.invites.invitedYou').replace('$0', inviterName)
          : '',
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            await acceptInvite(fromUid, inviterName);
            return;
          case 1:
            await declineInvite(fromUid);
            return;
          default:
            if (onCancel) {
              onCancel();
            }
            return;
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
            <Text>{I18n.t('bubble.invites.incomingInvites')}</Text>
          </CardItem>
        }
        renderItem={({item: invite}) => (
          <IncomingInviteItem
            invite={invite}
            onPress={(inviterName) => showActionSheet(inviterName, invite.from)}
          />
        )}
        keyExtractor={(invite) => invite.from}
      />
    </Card>
  );
};
