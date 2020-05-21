import React from 'react';
import {Image, ImageStyle, StyleSheet, Text, TextStyle, View, ViewStyle,} from 'react-native';
import {customTheme} from '../../theme';
import {BubbleLists} from './BubbleLists';
import I18n from '../../../services/i18n';
import {openURLInNewTab} from '../../../services/util/utils';
import Constants from '../../../services/util/Constants';
import {useNavigation} from '@react-navigation/native';
import {BubbleAnimation} from './BubbleAnimation';
import {SubmitButton} from '../../common/SubmitButton';
import assets from '../../assets';
import {Routes} from '../../../services/navigation/Routes';
import _ from 'lodash';
import {Template} from '../Template';
import {useBubble} from '../../../services/state/bubble/useBubble';
import {useProfile} from '../../../services/state/profile/useProfile';

const openRecommendations = async () => {
  openURLInNewTab(Constants.RECOMMENDATIONS_LINK);
};

export const Bubble: React.FC = () => {
  const nav = useNavigation();
  const {friends, incomingInvites, outgoingInvites, alerts} = useBubble();
  const profile = useProfile();

  const color =
    alerts.length === 0 ? customTheme.colors.green : customTheme.colors.red;

  return (
    <Template
      topColor={color}
      scrollViewContentContainerStyle={{backgroundColor: color}}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '65%',
          backgroundColor: color,
        }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: color,
            zIndex: -1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flex: 2}} />
          <View
            style={{
              flex: 2,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <BubbleAnimation
              speed={alerts.length > 0 ? 2 : 0.5}
              containerStyle={{height: '200%', aspectRatio: 1}}
            />
          </View>
          <View style={{flex: 1}} />
        </View>
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 2,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.title}>
              {profile?.name
                ? I18n.t('bubble.bubbleTitle').replace('$0', profile.name)
                : I18n.t('bubble.title')}
            </Text>
            <View style={styles.badgeContainer}>
              <Text style={[styles.badgeText, {color}]}>
                {alerts.length === 0
                  ? I18n.t('bubble.noAlert')
                  : I18n.t('bubble.xAlerts').replace(
                      '$0',
                      alerts.length.toString(),
                    )}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 2,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={
                alerts.length > 0
                  ? assets.images.bubble.alert
                  : assets.images.bubble.peaceful
              }
              style={{width: 75, height: 75}}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <SubmitButton
              titleStyle={{color: '#fff', paddingHorizontal: 24}}
              onPress={() => nav.navigate(Routes.Alert, {})}
              title={I18n.t('bubble.sendAlert')}
            />
          </View>
        </View>
      </View>
      <BubbleLists
        friends={_.sortBy(friends, 'lastMet')}
        incomingInvites={incomingInvites}
        outgoingInvites={outgoingInvites}
        alerts={alerts}
      />
    </Template>
  );
};

type Styles = {
  wrapper: ViewStyle;
  header: ViewStyle;
  title: TextStyle;
  badgeContainer: ViewStyle;
  badgeText: TextStyle;
  content: ViewStyle;
  middle: ViewStyle;
  bubble: ImageStyle;
  bubbleTextContainer: ViewStyle;
  bubbleAlertContainer: ViewStyle;
  bubbleAlert: ImageStyle;
  takeCareText: TextStyle;
  recommendationsContainer: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
  },
  title: {
    fontFamily: customTheme.boldFontFamily,
    fontSize: 24,
    color: customTheme.colors.gray,
    marginTop: 48,
    marginBottom: 16,
  },
  badgeContainer: {
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: customTheme.colors.green,
    fontFamily: customTheme.boldFontFamily,
  },
  content: {
    flexGrow: 0.3,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: customTheme.colors.lightBlue,
  },
  middle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendationsContainer: {
    //backgroundColor: '#f00',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 16,
    //marginBottom: 24,
    //marginBottom: Dimensions.LANGUETTE_ALWAYS_OPEN + Dimensions.TAB_BAR_HEIGHT,
  },
  takeCareText: {
    color: customTheme.colors.gray,
    fontFamily: customTheme.boldFontFamily,
    fontSize: 20,
    marginBottom: 24,
  },
  bubble: {
    alignSelf: 'center',
    width: 100,
    height: 100,
  },
  bubbleTextContainer: {
    position: 'absolute',
    top: -100,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  bubbleAlertContainer: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  bubbleAlert: {
    width: 75,
    height: 75,
  },
});
