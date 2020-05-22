import React from 'react';
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
import {Icon, ListItem} from 'react-native-elements';
import {customTheme} from '../../theme';
import assets from '../../assets';
import I18n from '../../../services/i18n';
import Constants from '../../../services/util/Constants';

type Props = {
  selected?: boolean;
  onSelected?: () => void;
  onDeselected?: () => void;
};

export const RecentFriendsItem: React.FC<Props> = ({
  selected,
  onSelected,
  onDeselected,
}) => {
  return (
    <ListItem
      containerStyle={styles.container}
      leftIcon={
        <View style={styles.avatar}>
          <Image
            style={styles.avatarImage}
            source={assets.images.bubble.avatarMulti}
          />
        </View>
      }
      title={
        <View>
          <Text numberOfLines={1} style={styles.friendTitle}>
            {I18n.t('bubble.alerts.recentFriendsTitle')}
          </Text>
        </View>
      }
      titleStyle={styles.friendTitle}
      subtitle={
        <View>
          <Text style={styles.friendSubtitle} numberOfLines={1}>
            {I18n.t('bubble.alerts.recentFriendsSubtitle').replace(
              '$0',
              Constants.RECENT_LIMIT_DAYS.toString(),
            )}
          </Text>
        </View>
      }
      rightElement={
        <TouchableOpacity
          onPress={() => {
            selected
              ? onDeselected && onDeselected()
              : onSelected && onSelected();
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
    width: 45,
    height: 45,
  },
  friendTitle: {
    fontFamily: customTheme.boldFontFamily,
  },
  friendSubtitle: {
    fontFamily: customTheme.fontFamily,
    color: customTheme.colors.gray,
  },
});
