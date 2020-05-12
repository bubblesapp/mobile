import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageStyle,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Friend, Profile} from '@bubblesapp/api';
import {useAPI} from '../../api/useAPI';
import {Icon, ListItem} from 'react-native-elements';
import {customTheme} from '../../theme/theme';
import assets from '../../assets';
import {daysAgoString} from './utils';

type Props = {
  friend: Friend;
  selected?: boolean;
  disabled?: boolean;
  onSelected?: (friend: Friend) => void;
  onDeselected?: (friend: Friend) => void;
};

export const FriendSelectedItem: React.FC<Props> = ({
  friend,
  selected,
  disabled,
  onSelected,
  onDeselected,
}) => {
  const [profile, setProfile] = useState<Profile>();
  //const [selected, setSelected] = useState(false);

  const api = useAPI();

  useEffect(() => {
    const profileSubscription = api.profiles
      .observe(friend.uid)
      .subscribe(setProfile);
    return () => profileSubscription.unsubscribe();
  }, [api, friend]);

  return (
    <ListItem
      disabled={disabled}
      disabledStyle={{opacity: 0.4}}
      topDivider={true}
      containerStyle={styles.container}
      leftIcon={
        <View style={styles.avatar}>
          <Image
            style={styles.avatarImage}
            source={assets.images.bubble.avatar}
          />
        </View>
      }
      title={
        <View style={{flexDirection: 'row', overflow: 'hidden'}}>
          <Text numberOfLines={1} style={styles.friendTitle}>
            {profile?.name}
            <Text style={styles.friendSubtitle}>
              {` (${profile?.email.split('@')[0]})`}
            </Text>
          </Text>
        </View>
      }
      titleStyle={styles.friendTitle}
      subtitle={
        <View>
          <Text style={styles.friendSubtitle} numberOfLines={1}>
            {daysAgoString(friend.lastMet)}
          </Text>
        </View>
      }
      rightElement={
        <TouchableOpacity
          onPress={() => {
            selected
              ? onSelected && onSelected(friend)
              : onDeselected && onDeselected(friend);
          }}>
          <Icon
            name={selected ? 'check-circle' : 'circle-thin'}
            type={'font-awesome'}
            color={
              selected
                ? customTheme.colors.success
                : customTheme.colors.mediumGray
            }
          />
        </TouchableOpacity>
      }
    />
  );
};

/*
<CheckBox
          containerStyle={{width: 24, backgroundColor: '#f00', margin: 0, padding: 0}}
          checkedIcon={'check-circle'}
          uncheckedIcon={'circle-thin'}
          textStyle={{display: 'none'}}
          checkedColor={customTheme.colors.success}
          onPress={() => setSelected(!selected)}
          checked={selected}
          right={true}
        />
 */

type Styles = {
  container: ViewStyle;
  avatar: ViewStyle;
  avatarImage: ImageStyle;
  friendTitle: TextStyle;
  friendSubtitle: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    height: 84,
  },
  avatar: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: customTheme.colors.lightBlue,
    borderRadius: 32,
    marginRight: Platform.OS === 'web' ? 16 : 0,
  },
  avatarImage: {
    width: 30,
    height: 30,
  },
  friendTitle: {
    fontFamily: customTheme.boldFontFamily,
  },
  friendSubtitle: {
    fontFamily: customTheme.fontFamily,
    color: customTheme.colors.gray,
  },
});
