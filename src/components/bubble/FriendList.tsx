import {Friend} from '../../models/Friend';
import {FriendItem} from './FriendItem';
import React, {useEffect, useState} from 'react';
import {useAPI} from '../../api/useAPI';
import {ActionSheet, Button, Card, CardItem, Text} from 'native-base';
import I18n from '../../i18n';
import {DatePicker} from './DatePicker';
import {useNavigation} from '@react-navigation/native';
import {BubbleNavigationProp} from './Bubble';
import {Routes} from '../../nav/Routes';
import {SwipeListView} from 'react-native-swipe-list-view';
import {TouchableHighlight} from 'react-native';
import Toast from '../common/Toast';
import {useNetInfo} from '@react-native-community/netinfo';

export const FriendList: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const API = useAPI();
  const netInfo = useNetInfo();

  useEffect(() => {
    const friendsSubscription = API.observeFriends().subscribe(setFriends);
    return () => friendsSubscription.unsubscribe();
  }, [API]);

  const navigation = useNavigation<BubbleNavigationProp>();

  const removeFriend = async (friendUid: string) => {
    try {
      if (netInfo.isInternetReachable) {
        await API.removeFriend(friendUid);
        Toast.success(I18n.t('bubble.friends.deleteFriendSuccess'));
      } else {
        API.removeFriend(friendUid).catch((err) => {
          console.log(err);
        });
      }
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
    ActionSheet.show(
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
            await onRemovePressed(friend.uid, );
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
    ActionSheet.show(
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
    <Card>
      <DatePicker
        visible={datePickerVisible}
        onDatePicked={async (date) => {
          setDatePickerVisible(false);
          if (selectedFriend) {
            await API.setLastMet(selectedFriend?.uid, date.getTime());
          }
        }}
        onCancel={() => setDatePickerVisible(false)}
      />
      <SwipeListView<Friend>
        data={friends}
        ListHeaderComponent={
          <CardItem header={true}>
            <Text>{I18n.t('bubble.friends.listHeader')}</Text>
          </CardItem>
        }
        ListEmptyComponent={
          <CardItem
            button={true}
            onPress={() => navigation.navigate(Routes.Invites)}
            style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Text style={{fontSize: 14, color: '#aaa'}}>
              {I18n.t('bubble.friends.emptyText')}
            </Text>
            <Button
              block={true}
              style={{marginTop: 24}}
              onPress={() => navigation.navigate(Routes.Invites)}>
              <Text style={{fontWeight: 'bold'}}>
                {I18n.t('bubble.friends.emptyButtonTitle')}
              </Text>
            </Button>
          </CardItem>
        }
        renderItem={({item: friend}) => (
          <TouchableHighlight
            onPress={() => onFriendPress(friend)}>
            <CardItem bordered={true}>
              <FriendItem friend={friend} />
            </CardItem>
          </TouchableHighlight>
        )}
        keyExtractor={(friend, index) => friend.uid + index}
      />
    </Card>
  );
};
