import React from 'react';
import {Platform, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {ListItem} from 'react-native-elements';
import assets from '../../assets';
import {customTheme} from '../../theme';
import {Alert} from '@bubblesapp/api';
import moment from 'moment';

type Props = {
  alert: Alert;
  onPress?: (alert: Alert) => void;
};

export const AlertItem: React.FC<Props> = ({alert, onPress}) => {
  return (
    <ListItem
      onPress={() => onPress && onPress(alert)}
      bottomDivider={true}
      containerStyle={styles.container}
      leftAvatar={{
        containerStyle: styles.avatar,
        size: 45,
        rounded: true,
        placeholderStyle: {
          backgroundColor: customTheme.colors.lightBlue,
        },
        source: assets.images.bubble.avatarAlert,
      }}
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
  title: TextStyle;
  subtitle: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    height: 72,
  },
  avatar: {
    marginRight: Platform.OS === 'web' ? 16 : 0,
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
