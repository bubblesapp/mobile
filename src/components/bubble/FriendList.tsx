import {Friend} from '@bubblesapp/api';
import {FriendItem} from './FriendItem';
import React, {useEffect, useState} from 'react';
import {useAPI} from '../../api/useAPI';
import I18n from '../../i18n';
import {DatePicker} from './DatePicker';
import {
  FlatList,
  Modal as ModalNative,
  Platform,
  ScrollView, SwipeableListView,
  View,
} from 'react-native';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {useAuth} from '../../auth/Auth';
import {useToast} from '../Toast';
import {FriendListEmpty} from './FriendListEmpty';
import {LogModal} from './LogModal';
import {SwipeListView} from 'react-native-swipe-list-view';
import {DestructiveButton} from './DestructiveButton';

export const FriendList: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([
    {
      uid: 'kjdsbodfjsfo',
      lastMet: 2532632762,
    },
    {
      uid: 'kjdsbodfjsfo',
      lastMet: 2532632762,
    },
    {
      uid: 'kjdsbodfjsfo',
      lastMet: 2532632762,
    },
    {
      uid: 'kjdsbodfjsfo',
      lastMet: 2532632762,
    },
    {
      uid: 'kjdsbodfjsfo',
      lastMet: 2532632762,
    },
    {
      uid: 'kjdsbodfjsfo',
      lastMet: 2532632762,
    },
    {
      uid: 'kjdsbodfjsfo',
      lastMet: 2532632762,
    },
    {
      uid: 'kjdsbodfjsfo',
      lastMet: 2532632762,
    },
  ]);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const auth = useAuth();
  const api = useAPI();

  const {showActionSheetWithOptions} = useActionSheet();
  const Toast = useToast();

  useEffect(() => {
    //const friendsSubscription = api.friends.observeAll().subscribe(setFriends);
    //return () => friendsSubscription.unsubscribe();
  }, [api]);

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
    /*const options = [
      I18n.t('bubble.friends.setLastMet'),
      I18n.t('bubble.friends.deleteFriendButtonTitle'),
      I18n.t('bubble.friends.confirmDeleteCancel'),
    ];
    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex: 1,
        cancelButtonIndex: 2,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            setDatePickerVisible(true);
            console.log(datePickerVisible);
            setSelectedFriend(friend);
            return;
          case 1:
            console.log('Remove pressed');
            await onRemovePressed(friend.uid);
            console.log('Voila');
            return;
          case 2:
            return;
        }
      },
    );*/
    setSelectedFriend(friend);
    setDatePickerVisible(true);
  };

  const onRemovePressed = async (friendUid: string) => {
    const options = [
      I18n.t('bubble.friends.confirmDeleteConfirm'),
      I18n.t('bubble.friends.confirmDeleteCancel'),
    ];
    showActionSheetWithOptions(
      {
        options,
        title: I18n.t('bubble.friends.confirmDeleteFriendTitle'),
        destructiveButtonIndex: 0,
        cancelButtonIndex: 1,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            await removeFriend(friendUid);
            break;
          case 1:
            break;
        }
      },
    );
  };

  return (
    <View>
      <LogModal
        onDatePicked={async (date: Date) => {
          setDatePickerVisible(false);
          if (typeof auth.getCurrentUser() !== 'undefined' && selectedFriend) {
            const uid = auth.getCurrentUser() as string;
            const lastMet = date.getTime();
            await api.friends.update({lastMet}, selectedFriend?.uid, uid);
            await api.friends.update({lastMet}, uid, selectedFriend?.uid);
          }
        }}
        visible={datePickerVisible}
        onCancel={() => setDatePickerVisible(false)}
      />
      {/*friends.length > 0 ? (
        friends.map((friend) => {
          return (
            <FriendItem friend={friend} onLogPress={() => onLogPress(friend)} />
          );
        })
      ) : (
        <FriendListEmpty />
      )*/}
      <SwipeListView<Friend>
        contentContainerStyle={{flex: 1}}
        data={friends}
        scrollEnabled={false}
        ListEmptyComponent={<FriendListEmpty />}
        renderItem={({item: friend}, rowMap) => (
          <FriendItem friend={friend} onLogPress={() => onLogPress(friend)} />
        )}
        keyExtractor={(friend, index) => friend.uid + index}
        renderHiddenItem={ ({item}, rowMap) => <DestructiveButton title={} />}
        rightOpenValue={-75}
      />
    </View>
  );
};

/*<FlatList<Friend>
        contentContainerStyle={{flex: 1}}
        data={friends}
        scrollEnabled={false}
        ListEmptyComponent={<FriendListEmpty />}
        renderItem={({item: friend}) => (
          <FriendItem friend={friend} onLogPress={() => onLogPress(friend)} />
        )}
        keyExtractor={(friend, index) => friend.uid + index}
      />*/

/*
<DatePicker
        visible={datePickerVisible}
        onDatePicked={async (date: Date) => {
          setDatePickerVisible(false);
          if (typeof auth.getCurrentUser() !== 'undefined' && selectedFriend) {
            const uid = auth.getCurrentUser() as string;
            const lastMet = date.getTime();
            await api.friends.update({lastMet}, selectedFriend?.uid, uid);
            await api.friends.update({lastMet}, uid, selectedFriend?.uid);
          }
        }}
        onCancel={() => setDatePickerVisible(false)}
      />
*/
