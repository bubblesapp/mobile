import React from 'react';
import {
  Image,
  ImageStyle, SafeAreaView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {customTheme} from '../theme';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import I18n from '../../services/i18n';
import {Routes} from '../../services/navigation/Routes';
import Oval from '../../../assets/images/Oval.png';
import User from '../../../assets/images/User.png';
import {InviteButton} from '../common/InviteButton';
import {Link, useLinkBuilder, useLinkTo} from '@react-navigation/native';

type TabBarLabelProps = {
  focused: boolean;
  color: string;
  title: string;
};

const TabBarLabel: React.FC<TabBarLabelProps> = (props) => {
  return (
    <View
      style={[
        styles.labelContainer,
        props.focused ? styles.labelContainerFocused : undefined,
      ]}>
      <Text style={styles.labelText}>{props.title}</Text>
    </View>
  );
};

type TabBarIconProps = {
  imageSource: any;
};

const TabBarIcon: React.FC<TabBarIconProps> = (props) => {
  return <Image source={props.imageSource} style={styles.iconImage} />;
};

type Styles = {
  tabBar: ViewStyle;
  buttonContainer: ViewStyle;
  iconImage: ImageStyle;
  labelContainer: ViewStyle;
  labelContainerFocused: ViewStyle;
  labelText: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  tabBar: {
    flexDirection: 'row',
    height: 72,
    backgroundColor: '#fff',
    borderTopColor: customTheme.colors.lightGray,
    borderTopWidth: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    marginTop: 16,
    width: 20,
    height: 20,
  },
  labelContainer: {
    marginTop: 8,
    flex: 1,
    alignSelf: 'stretch',
  },
  labelContainerFocused: {
    borderBottomWidth: 4,
    borderBottomColor: customTheme.colors.ctaBackground,
  },
  labelText: {
    fontFamily: customTheme.fontFamily,
    color: customTheme.colors.gray,
    fontSize: 12,
    textAlign: 'center',
  },
});

export const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}): JSX.Element => {
  return (
    <SafeAreaView>
      <View style={styles.tabBar}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (state.index !== 0) {
              navigation.navigate(Routes.BubbleNavigator);
            }
          }}>
          <View style={styles.buttonContainer}>
            <TabBarIcon imageSource={Oval} />
            <TabBarLabel
              focused={state.index === 0}
              color={customTheme.colors.gray}
              title={I18n.t('bubble.title')}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            if (state.index !== 1) {
              navigation.navigate(Routes.ProfileNavigator);
            }
          }}>
          <View style={styles.buttonContainer}>
            <TabBarIcon imageSource={User} />
            <TabBarLabel
              focused={state.index === 1}
              color={customTheme.colors.gray}
              title={I18n.t('profile.title')}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(Routes.Invite, {})
          }
          style={styles.buttonContainer}>
          <InviteButton />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
