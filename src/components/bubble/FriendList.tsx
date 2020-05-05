import {Friend} from '@bubblesapp/api';
import {FriendItem} from './FriendItem';
import React, {useEffect, useState} from 'react';
import {useAPI} from '../../api/useAPI';
import I18n from '../../i18n';
import {DatePicker} from './DatePicker';
import {FlatList, View} from 'react-native';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {useAuth} from '../../auth/Auth';
import {useToast} from '../Toast';
import {FriendListEmpty} from './FriendListEmpty';

export const FriendList: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const auth = useAuth();
  const api = useAPI();

  const {showActionSheetWithOptions} = useActionSheet();
  const Toast = useToast();

  useEffect(() => {
    const friendsSubscription = api.friends.observeAll().subscribe(setFriends);
    return () => friendsSubscription.unsubscribe();
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

  const onFriendPress = async (friend: Friend) => {
    const options = [
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
    );
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
    <View style={{flex: 1}}>
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
      <FlatList<Friend>
        scrollEnabled={false}
        contentContainerStyle={{flex: 1}}
        data={friends}
        ListEmptyComponent={<FriendListEmpty />}
        renderItem={({item: friend}) => (
          <FriendItem friend={friend} onPress={() => onFriendPress(friend)} />
        )}
        keyExtractor={(friend, index) => friend.uid + index}
      />
    </View>
  );
};
