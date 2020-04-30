import {Invite} from '../../models/Invite';
import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAPI} from '../../api/useAPI';
import I18n from '../../i18n';
import {OutgoingInviteItem} from './OutgoingInviteItem';
import {Card} from 'react-native-elements';
import {useToast} from '../Toast';
import {useActionSheet} from '@expo/react-native-action-sheet';

const BUTTONS = [
  I18n.t('bubble.invites.deleteOutgoing'),
  I18n.t('bubble.invites.cancel'),
];
const DESTRUCTIVE_INDEX = 0;
const CANCEL_INDEX = 1;

export const OutgoingInviteList: React.FC = (): JSX.Element | null => {
  const [invites, setInvites] = useState<Invite[]>([]);
  const api = useAPI();
  const Toast = useToast();
  const {showActionSheetWithOptions} = useActionSheet();

  console.log(invites);

  useEffect(() => {
    const invitesSubscription = api.invites.outgoing
      .observeAll()
      .subscribe(setInvites);
    return () => invitesSubscription.unsubscribe();
  }, [api]);

  if (invites.length === 0) {
    return null;
  }

  const deleteOutgoingInvite = async (toEmail: string) => {
    try {
      await api.invites.outgoing.delete(toEmail);
    } catch (err) {
      Toast.danger(err.message);
    }
  };

  const showActionSheet = (toEmail: string) => {
    showActionSheetWithOptions(
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
    <Card title={I18n.t('bubble.invites.outgoingInvites')}>
      <FlatList<Invite>
        data={invites}
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
