import {Friend, Invite} from '@bubblesapp/api';
import {FriendItem} from './FriendItem';
import React from 'react';
import {useAPI} from '../../../services/api/useAPI';
import I18n from '../../../services/i18n';
import {View} from 'react-native';
import {useToast} from '../../common/Toast';
import {PeopleListEmpty} from './PeopleListEmpty';
import {SwipeListView} from 'react-native-swipe-list-view';
import {DestructiveButton} from './DestructiveButton';
import {OutgoingInviteItem} from './OutgoingInviteItem';
import {IncomingInviteItem} from './IncomingInviteItem';
import {Analytics, Events} from '../../../services/analytics/Analytics';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../../services/navigation/Routes';
import _ from 'lodash';

type Person = {
  key: string;
  type: 'friend' | 'incoming' | 'outgoing';
  item: Friend | Invite;
};

type Props = {
  friends: Friend[];
  outgoingInvites: Invite[];
  incomingInvites: Invite[];
};

const friendToItem = (friend: Friend): Person => {
  return {
    key: friend.uid,
    type: 'friend',
    item: friend,
  };
};

const incomingToItem = (incomingInvite: Invite): Person => {
  return {
    key: incomingInvite.from,
    type: 'incoming',
    item: incomingInvite,
  };
};

const outgoingToItem = (outgoingInvite: Invite): Person => {
  return {
    key: outgoingInvite.to,
    type: 'outgoing',
    item: outgoingInvite,
  };
};

export const PeopleList: React.FC<Props> = ({
  friends,
  outgoingInvites,
  incomingInvites,
}) => {
  const api = useAPI();
  const Toast = useToast();
  const nav = useNavigation();

  const people = _.uniqBy<Person>(
    [
      ..._.orderBy(friends, (i) => i.lastMet || 0, 'asc')
        .map<Person>(friendToItem),
      ..._.orderBy(outgoingInvites, (i) => i.createdAt || 0, 'asc')
        .map<Person>(outgoingToItem),
      ..._.orderBy(incomingInvites, (i) => i.createdAt || 0, 'asc')
        .map<Person>(incomingToItem),
    ],
    (p: Person) => p.key,
  );

  const removeFriend = async (friendUid: string) => {
    try {
      await api.friends.delete(friendUid);
      Toast.success(I18n.t('bubble.friends.deleteFriendSuccess'));
    } catch (err) {
      console.log(err);
      Toast.danger(err.message);
    }
  };

  const onLogPress = async (uid: string) => {
    nav.navigate(Routes.Log, {uid});
  };

  return (
    <View style={{backgroundColor: '#fff'}}>
      {people.length > 0 ? (
        <SwipeListView<Person>
          scrollEnabled={false}
          renderScrollComponent={(props) => <View {...props} />}
          data={_.reverse(people)}
          renderItem={({item}) => {
            return item.type === 'friend' ? (
              <FriendItem
                friend={item.item as Friend}
                onLogPress={() => onLogPress((item.item as Friend).uid)}
              />
            ) : item.type === 'outgoing' ? (
              <OutgoingInviteItem invite={item.item as Invite} />
            ) : item.type === 'incoming' ? (
              <IncomingInviteItem invite={item.item as Invite} />
            ) : (
              <></>
            );
          }}
          keyExtractor={(item) => item.key}
          renderHiddenItem={({item}) => {
            const title =
              item.type === 'outgoing'
                ? 'bubble.invites.cancel'
                : item.type === 'incoming'
                ? 'bubble.invites.decline'
                : 'bubble.friends.removeFriend';
            return (
              <DestructiveButton
                title={I18n.t(title)}
                onPress={async () => {
                  if (item.type === 'friend') {
                    await removeFriend((item.item as Friend).uid);
                  } else if (item.type === 'outgoing') {
                    await api.invites.outgoing.delete((item.item as Invite).to);
                  } else if (item.type === 'incoming') {
                    await api.invites.incoming.delete((item.item as Invite).from);
                    Analytics.logEvent(Events.DeclineInvite);
                  }
                }}
              />
            );
          }}
          disableRightSwipe={true}
          rightOpenValue={-85}
        />
      ) : (
        <PeopleListEmpty />
      )}
    </View>
  );
};
