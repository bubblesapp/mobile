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
import {customTheme} from '../theme/theme';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import I18n from '../i18n';
import {Routes} from '../nav/Routes';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Oval from '../../assets/images/Oval.png';
import User from '../../assets/images/User.png';

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
  return (
    <Image
      source={props.imageSource}
      style={styles.iconImage}
    />
  );
};

type Styles = {
  tabBar: ViewStyle;
  buttonContainer: ViewStyle;
  iconImage: ImageStyle;
  labelContainer: ViewStyle;
  labelContainerFocused: ViewStyle;
  labelText: TextStyle;
  outerCircle: ViewStyle;
  innerCircle: ViewStyle;
};

const tabBarHeight = 72;

const styles = StyleSheet.create<Styles>({
  tabBar: {
    flexDirection: 'row',
    height: tabBarHeight,
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
  outerCircle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 52,
    height: 52,
    backgroundColor: customTheme.colors.ctaBackgroundLight,
    borderRadius: 26,
  },
  innerCircle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
    backgroundColor: customTheme.colors.ctaBackground,
    borderRadius: 22,
  },
});

export const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}): JSX.Element => {
  const insets = useSafeArea();
  //console.log(insets.bottom, styles.tabBar.height, (styles.tabBar.height as number));
  return (
    <SafeAreaView
      style={[styles.tabBar, {height: insets.bottom + tabBarHeight}]}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (state.index !== 0) {
            navigation.navigate(Routes.Bubble);
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
            navigation.navigate(Routes.Profile);
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
      <TouchableOpacity onPress={() => {}} style={styles.buttonContainer}>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}>
            <FontAwesome5
              name={'plus'}
              color={'#fff'}
              size={22}
              style={{lineHeight: 44}}
            />
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
