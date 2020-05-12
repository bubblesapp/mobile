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
import {ListItem} from 'react-native-elements';
import {customTheme} from '../../theme/theme';
import assets from '../../assets';
import {daysAgoString} from './utils';
import {NameTitle} from './NameTitle';

type Props = {
  friend: Friend;
  onLogPress: (friend: Friend) => void;
};

export const FriendItem: React.FC<Props> = ({friend, onLogPress}) => {
  const [profile, setProfile] = useState<Profile>();
  const api = useAPI();

  useEffect(() => {
    const profileSubscription = api.profiles
      .observe(friend.uid)
      .subscribe(setProfile);
    return () => profileSubscription.unsubscribe();
  }, [api, friend]);

  return (
    <ListItem
      bottomDivider={true}
      containerStyle={styles.container}
      leftIcon={
        <View style={styles.avatar}>
          <Image
            style={styles.avatarImage}
            source={assets.images.bubble.avatar}
          />
        </View>
      }
      title={profile && <NameTitle profile={profile} />}
      subtitle={daysAgoString(friend.lastMet)}
      subtitleStyle={styles.subtitle}
      subtitleProps={{numberOfLines: 1}}
      rightElement={
        <TouchableOpacity
          onPress={() => onLogPress(friend)}
          style={styles.rightIcon}>
          <Image
            source={assets.images.bubble.notepad}
            style={styles.rightIconImage}
          />
        </TouchableOpacity>
      }
    />
  );
};

type Styles = {
  container: ViewStyle;
  avatar: ViewStyle;
  avatarImage: ImageStyle;
  subtitle: TextStyle;
  rightIcon: ViewStyle;
  rightIconImage: ImageStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    height: 72,
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
  subtitle: {
    fontFamily: customTheme.fontFamily,
    color: customTheme.colors.gray,
  },
  rightIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: customTheme.colors.lightGray,
    borderRadius: 15,
    width: 50,
    height: 30,
    marginLeft: 16,
  },
  rightIconImage: {
    width: 20,
    height: 20,
    marginLeft: 4,
  },
});
