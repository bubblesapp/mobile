import React from 'react';
import {
  ImageStyle,
  Platform,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import assets from '../../assets';
import {customTheme} from '../../theme';
import {Invite} from '@bubblesapp/api';
import I18n from '../../../services/i18n';

type Props = {
  invite: Invite;
};

export const OutgoingInviteItem: React.FC<Props> = ({invite}) => {
  return (
    <ListItem
      bottomDivider={true}
      containerStyle={styles.container}
      leftElement={
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
      }
      title={invite.to}
      titleStyle={styles.title}
      titleProps={{
        numberOfLines: 1,
      }}
      subtitle={I18n.t('bubble.invites.awaitingResponse')}
      subtitleStyle={styles.subtitle}
      subtitleProps={{
        numberOfLines: 1,
      }}
    />
  );
};

type Styles = {
  container: ViewStyle;
  avatar: ViewStyle;
  avatarImage: ImageStyle;
  title: TextStyle;
  subtitle: TextStyle;
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
  title: {
    fontFamily: customTheme.boldFontFamily,
    fontSize: 14,
  },
  subtitle: {
    fontFamily: customTheme.fontFamily,
    color: customTheme.colors.gray,
  },
});
