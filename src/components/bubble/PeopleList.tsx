import {Friend, Invite} from '@bubblesapp/api';
import {FriendItem} from './FriendItem';
import React, {useState} from 'react';
import {useAPI} from '../../api/useAPI';
import I18n from '../../i18n';
import {View} from 'react-native';
import {useAuth} from '../../auth/Auth';
import {useToast} from '../Toast';
import {PeopleListEmpty} from './PeopleListEmpty';
import {LogModal} from './LogModal';
import {SwipeListView} from 'react-native-swipe-list-view';
import {DestructiveButton} from './DestructiveButton';
import {OutgoingInviteItem} from '../invites/OutgoingInviteItem';
import {IncomingInviteItem} from '../invites/IncomingInviteItem';
import {Analytics, Events} from '../../analytics/Analytics';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../nav/Routes';
import _ from 'lodash';

type Props = {
  friends: Friend[];
  outgoingInvites: Invite[];
  incomingInvites: Invite[];
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

  const isIncomingInvite = (item: Friend | Invite) =>
    (item as Invite).to && (item as Invite).to === auth.state.email;

  const isOutgoingInvite = (item: Friend | Invite) =>
    (item as Invite).from && (item as Invite).from === auth.state.uid;

  const isFriend = (item: Friend | Invite) => !!(item as Friend).uid;

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

  const itemCount =
    friends.length + incomingInvites.length + outgoingInvites.length;

  return (
    <View style={{backgroundColor: '#fff'}}>
      {itemCount > 0 ? (
        <SwipeListView<Friend | Invite>
          scrollEnabled={false}
          useSectionList={true}
          renderScrollComponent={(props) => <View {...props} />}
          //contentContainerStyle={{flexGrow: 1}}
          sections={[
            {
              title: 'Incoming',
              data: _.orderBy(incomingInvites, 'createdAt', 'desc'),
            },
            {
              title: 'Outgoing',
              data: _.orderBy(outgoingInvites, 'createdAt', 'desc'),
            },
            {
              title: 'Friends',
              data: _.orderBy(friends, 'lastMet', 'desc'),
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
            ((item as Friend).uid || (item as Invite).from) + index.toString()
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
