import React, {useEffect, useState} from 'react';
import {Image, ImageStyle, Platform, ScrollView, StyleSheet, Text, TextStyle, View, ViewStyle,} from 'react-native';
import {customTheme} from '../../theme/theme';
import {useAuth} from '../../auth/Auth';
import {BubbleLists} from './BubbleLists';
import I18n from '../../i18n';
import {Alert, Friend, Invite, Profile} from '@bubblesapp/api';
import {useAPI} from '../../api/useAPI';
import {Analytics} from '../../analytics/Analytics';
import {openURLInNewTab} from './utils';
import Constants from '../../Constants';
import {useNavigation} from '@react-navigation/native';
import {BubbleAnimation} from './BubbleAnimation';
import {SubmitButton} from '../common/SubmitButton';
import assets from '../../assets';
import {Routes} from '../../nav/Routes';
import _ from 'lodash';
import {Helmet} from 'react-helmet';

const openRecommendations = async () => {
  openURLInNewTab(Constants.RECOMMENDATIONS_LINK);
};

export const Bubble: React.FC = () => {
  const [profile, setProfile] = useState<Profile>();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [incomingInvites, setIncomingInvites] = useState<Invite[]>([]);
  const [outgoingInvites, setOutgoingInvites] = useState<Invite[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const auth = useAuth();
  const api = useAPI();
  const nav = useNavigation();

  useEffect(() => {
    const friendsSubscription = api.friends.observeAll().subscribe((f) => {
      Analytics.set('people_count', f.length);
      setFriends(f);
    });
    return () => friendsSubscription.unsubscribe();
  }, [api]);

  useEffect(() => {
    const outgoingInvitesSubscription = api.invites.outgoing
      .observeAll()
      .subscribe(setOutgoingInvites);
    return () => outgoingInvitesSubscription.unsubscribe();
  }, [auth.state.uid, api]);

  useEffect(() => {
    const incomingInvitesSubscription = api.invites.incoming
      .observeAll()
      .subscribe(setIncomingInvites);
    return () => incomingInvitesSubscription.unsubscribe();
  }, [auth.state.uid, api]);

  useEffect(() => {
    const alertsSubscription = api.alerts.observeAll().subscribe((a) => {
      Analytics.set('alert_count', a.length);
      setAlerts(a);
    });
    return () => alertsSubscription.unsubscribe();
  }, [api]);

  useEffect(() => {
    const profileSubscription = api.profiles.observe().subscribe(setProfile);
    return () => profileSubscription.unsubscribe();
  }, [api]);

  const color =
    alerts.length === 0 ? customTheme.colors.green : customTheme.colors.red;

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: color,
      }}>
      {Platform.OS === 'web' && (
        <Helmet>
          <style>{`body { background: linear-gradient(white 0%, white 50%, ${color} 50%, ${color} 100%); }`}</style>
        </Helmet>
      )}
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
              onPress={() => nav.navigate(Routes.Alert)}
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
    </ScrollView>
  );
};
{
  /*</Wrapper>*/
}

/*
<View style={[styles.header, {backgroundColor: color}]}>
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
      <View style={{flex: 0.1, minHeight: 120}}>
        <View style={{flex: 1, minHeight: 60, backgroundColor: color}} />
        <View style={[styles.bubbleTextContainer]}>
<BubbleAnimation speed={alerts.length > 0 ? 2 : 0.5} />
</View>
<View style={{flex: 1, minHeight: 60, backgroundColor: color}} />
</View>


<View style={[styles.content, {backgroundColor: color}]}>
        <View style={styles.recommendationsContainer}>
          <SubmitButton
            containerStyle={{margin: 16}}
            buttonStyle={{backgroundColor: customTheme.colors.red}}
            onPress={() => openRecommendations()}
            title={I18n.t('bubble.sendAlert')}
          />
        </View>
        <BubbleLists
          friends={friends}
          incomingInvites={incomingInvites}
          outgoingInvites={outgoingInvites}
          alerts={alerts}
        />
      </View>
 */

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
