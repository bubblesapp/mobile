import {Friend, Invite} from '@bubblesapp/api';
import {FriendItem} from './FriendItem';
import React, {useState} from 'react';
import {useAPI} from '../../api/useAPI';
import I18n from '../../i18n';
import {View} from 'react-native';
import {useAuth} from '../../auth/Auth';
import {useToast} from '../Toast';
import {PeopleListEmpty} from './PeopleListEmpty';
import {SwipeListView} from 'react-native-swipe-list-view';
import {DestructiveButton} from './DestructiveButton';
import {OutgoingInviteItem} from '../invites/OutgoingInviteItem';
import {IncomingInviteItem} from '../invites/IncomingInviteItem';
import {Analytics, Events} from '../../analytics/Analytics';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../nav/Routes';
import _ from 'lodash';
import {Person} from '../../models/Person';

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
  const [selectedFriend, setSelectedFriend] = useState<Friend>();
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const auth = useAuth();
  const api = useAPI();
  const Toast = useToast();
  const nav = useNavigation();

  /* const isIncomingInvite = (item: Friend | Invite) =>
    (item as Invite).to && (item as Invite).to === auth.state.email;

  const isOutgoingInvite = (item: Friend | Invite) =>
    (item as Invite).from && (item as Invite).from === auth.state.uid;

  const isFriend = (item: Friend | Invite) => !!(item as Friend).uid; */

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

  const onLogPress = async (friend: Friend) => {
    //setSelectedFriend(friend);
    //setDatePickerVisible(true);
    nav.navigate(Routes.Log, {friend});
  };

  const itemCount = people.length;
  //friends.length + incomingInvites.length + outgoingInvites.length;

  return (
    <View style={{backgroundColor: '#fff'}}>
      {itemCount > 0 ? (
        <SwipeListView<Person>
          scrollEnabled={false}
          //useSectionList={true}
          renderScrollComponent={(props) => <View {...props} />}
          //contentContainerStyle={{flexGrow: 1}}
          /* sections={[
            {
              title: 'Incoming',
              data: _.orderBy(incomingInvites, (i) => i.createdAt || 0, 'desc'),
            },
            {
              title: 'Outgoing',
              data: _.orderBy(outgoingInvites, (i) => i.createdAt || 0, 'desc'),
            },
            {
              title: 'Friends',
              data: _.orderBy(friends, (f) => f.lastMet || 0, 'desc'),
            },
          ]}*/
          data={_.reverse(people)}
          renderItem={({item}) => {
            return item.type === 'friend' ? (
              <FriendItem
                friend={item.item as Friend}
                onLogPress={() => onLogPress(item.item as Friend)}
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

/*
<SwipeListView<Friend | Invite>
          contentContainerStyle={{height: itemCount * 72}}
          scrollEnabled={true}
          useSectionList={true}
          sections={[
            {
              title: 'Incoming',
              data: incomingInvites,
            },
            {
              title: 'Outgoing',
              data: outgoingInvites,
            },
            {
              title: 'Friends',
              data: friends,
            },
          ]}
          renderItem={({item}) => {
            return isFriend(item) ? (
              <FriendItem
                friend={item as Friend}
                onLogPress={() => onLogPress(item as Friend)}
              />
            ) : isOutgoingInvite(item) ? (
              <OutgoingInviteItem invite={item as Invite} />
            ) : isIncomingInvite(item) ? (
              <IncomingInviteItem invite={item as Invite} />
            ) : (
              <></>
            );
          }}
          keyExtractor={(item, index) =>
            ((item as Friend).uid || (item as Invite).createdAt) +
            index.toString()
          }
          renderHiddenItem={({item}) => {
            const title = isOutgoingInvite(item)
              ? 'bubble.invites.cancel'
              : isIncomingInvite(item)
              ? 'bubble.invites.decline'
              : 'bubble.friends.removeFriend';
            return (
              <DestructiveButton
                title={I18n.t(title)}
                onPress={async () => {
                  if (isFriend(item)) {
                    await removeFriend((item as Friend).uid);
                  } else if (isOutgoingInvite(item)) {
                    await api.invites.outgoing.delete((item as Invite).to);
                  } else if (isIncomingInvite(item)) {
                    await api.invites.incoming.delete((item as Invite).from);
                    Analytics.logEvent(Events.DeclineInvite);
                  }
                }}
              />
            );
          }}
          disableRightSwipe={true}
          rightOpenValue={-85}
        />
 */
