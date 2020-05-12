import React from 'react';
import {ImageStyle, Platform, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import assets from '../../assets';
import {customTheme} from '../../theme/theme';
import {Alert} from '@bubblesapp/api';
import moment from 'moment';

type Props = {
  alert: Alert;
  onPress?: (alert: Alert) => void;
};

export const AlertItem: React.FC<Props> = ({alert, onPress}) => {
  console.log(alert);
  return (
    <ListItem
      onPress={() => onPress && onPress(alert)}
      topDivider={true}
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
          source={assets.images.bubble.alert}
        />
      }
      title={alert.message}
      titleStyle={styles.title}
      titleProps={{
        numberOfLines: 1,
      }}
      subtitle={moment(alert.createdAt).format('dddd D, HH:mm')}
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
    backgroundColor: customTheme.colors.red,
    marginRight: Platform.OS === 'web' ? 16 : 0,
  },
  avatarImage: {
    width: 44,
    height: 44,
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
