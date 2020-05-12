import React, {useEffect, useState} from 'react';
import {Image, ImageStyle, Platform, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Invite} from '../../models/Invite';
import {Avatar, Badge, ListItem} from 'react-native-elements';
import assets from '../../assets';
import {customTheme} from '../../theme/theme';
import {Profile} from '@bubblesapp/api';
import {useAPI} from '../../api/useAPI';
import I18n from '../../i18n';
import {useToast} from '../Toast';
import {Analytics, Events} from '../../analytics/Analytics';

type Props = {
  invite: Invite;
};

export const IncomingInviteItem: React.FC<Props> = ({invite}) => {
  const [profile, setProfile] = useState<Profile>();

  const api = useAPI();
  const Toast = useToast();

  useEffect(() => {
    const profileSubscription = api.profiles
      .observe(invite.from)
      .subscribe(setProfile);
    return () => profileSubscription.unsubscribe();
  }, [api, invite]);

  const accept = async () => {
    try {
      await api.invites.incoming.accept(invite.from);
      Toast.success(I18n.t('bubble.invites.acceptSuccess'));
      Analytics.logEvent(Events.AcceptInvite);
    } catch (err) {
      Toast.danger(err.message);
    }
  };

  return (
    <ListItem
      bottomDivider={true}
      containerStyle={styles.container}
      leftElement={
        <View>
          <Avatar
            size={44}
            rounded={true}
            placeholderStyle={{
              backgroundColor: customTheme.colors.lightBlue,
            }}
            containerStyle={styles.avatar}
            avatarStyle={styles.avatarImage}
            source={assets.images.bubble.avatar}
          />
          <Badge
            badgeStyle={styles.badge}
            containerStyle={styles.badgeContainer}
          />
        </View>
      }
      title={profile?.name}
      titleStyle={styles.title}
      titleProps={{
        numberOfLines: 1,
      }}
      subtitle={I18n.t('bubble.invites.tapToRespond')}
      subtitleStyle={styles.subtitle}
      subtitleProps={{
        numberOfLines: 1,
      }}
      rightIcon={{
        type: 'font-awesome',
        name: 'check',
        size: 20,
        color: customTheme.colors.ctaBackground,
        onPress: () => accept(),
        containerStyle: styles.rightIcon,
      }}
    />
  );
};

type Styles = {
  container: ViewStyle;
  avatar: ViewStyle;
  avatarImage: ImageStyle;
  badgeContainer: ViewStyle;
  badge: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  rightIcon: ViewStyle;
  rightIconImage: ImageStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    height: 72,
  },
  avatar: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: customTheme.colors.lightBlue,
    marginRight: Platform.OS === 'web' ? 16 : 0,
  },
  avatarImage: {
    margin: 7,
    width: 30,
    height: 30,
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: 15,
  },
  badge: {
    backgroundColor: customTheme.colors.ctaBackground,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  title: {
    fontFamily: customTheme.boldFontFamily,
    fontSize: 14,
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
