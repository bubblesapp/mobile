import {Invite} from '@bubblesapp/api';
import React, {useEffect, useState} from 'react';
import {useAPI} from '../../api/useAPI';
import I18n from '../../i18n';
import {IncomingInviteItem} from './IncomingInviteItem';
import {FlatList} from 'react-native';
import {Card} from 'react-native-elements';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {useToast} from '../Toast';

const BUTTONS = [
  I18n.t('bubble.invites.accept'),
  I18n.t('bubble.invites.decline'),
  I18n.t('bubble.invites.cancel'),
];
const DESTRUCTIVE_INDEX = 1;
const CANCEL_INDEX = 2;

export const IncomingInviteList: React.FC = (): JSX.Element | null => {
  const [invites, setInvites] = useState<Invite[]>([]);
  const api = useAPI();
  const Toast = useToast();

  const {showActionSheetWithOptions} = useActionSheet();

  useEffect(() => {
    const invitesSubscription = api.invites.incoming
      .observeAll()
      .subscribe(setInvites);
    return () => invitesSubscription.unsubscribe();
  }, [api]);

  if (invites.length === 0) {
    return null;
  }

  const acceptInvite = async (
    fromUid: string,
    inviterName: string | undefined,
  ) => {
    try {
      await api.invites.incoming.accept(fromUid);
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
      await api.invites.incoming.delete(fromUid);
    } catch (err) {
      Toast.danger(err.message);
    }
  };

  const showActionSheet = (
    inviterName: string | undefined,
    fromUid: string,
    onCancel?: () => void,
  ) => {
    showActionSheetWithOptions(
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
    <Card title={I18n.t('bubble.invites.incomingInvites')}>
      <FlatList<Invite>
        data={invites}
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
