import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageStyle,
  Linking,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {customTheme} from '../../theme/theme';
import {useAuth} from '../../auth/Auth';
import {BubbleLists} from './BubbleLists';
import {Wrapper} from '../common/Wrapper';
import assets from '../../assets';
import I18n from '../../i18n';
import {ExtraButton} from '../common/ExtraButton';
import {AlertModal} from './AlertModal';
import {Alert, Friend, Invite} from '@bubblesapp/api';
import {useAPI} from '../../api/useAPI';
import {Analytics} from '../../analytics/Analytics';
import {openURLInNewTab} from './utils';
import Constants from '../../Constants';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../nav/Routes';

const openRecommendations = async () => {
  openURLInNewTab(Constants.RECOMMENDATIONS_LINK);
};

export const Bubble: React.FC = () => {
  const [alertModalVisible, setAlertModalVisible] = useState(false);
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

  const color =
    alerts.length === 0 ? customTheme.colors.green : customTheme.colors.red;

  return (
    <Wrapper topColor={color} bottomColor={'#fff'} scrollEnabled={true}>
      <View style={[styles.header, {backgroundColor: color}]}>
        <Text style={styles.title}>
          {auth.state.name
            ? I18n.t('bubble.bubbleTitle').replace('$0', auth.state.name)
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
      <View style={{flex: 0.15, minHeight: 120}}>
        <View style={{flex: 0.5, minHeight: 60, backgroundColor: color}} />
        <View style={[styles.bubbleTextContainer]}>
          <Image source={assets.images.bubble.bubble} style={styles.bubble} />
          <TouchableOpacity
            style={styles.bubbleAlertContainer}
            onPress={() => nav.navigate(Routes.Alert)}>
            {/*<AlertModal
              onCancel={() => setAlertModalVisible(false)}
              onAlertSent={() => setAlertModalVisible(false)}
              visible={alertModalVisible}
            />*/}
            <Image
              source={assets.images.bubble.alert}
              style={styles.bubbleAlert}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.5, minHeight: 60, backgroundColor: customTheme.colors.lightBlue}} />
      </View>
      <View style={styles.content}>
        <View style={styles.recommendationsContainer}>
          <Text style={styles.takeCareText}>{I18n.t('bubble.takeCare')}</Text>
          <ExtraButton
            onPress={() => openRecommendations()}
            title={I18n.t('bubble.recommendationsButton')}
          />
        </View>
        <BubbleLists
          friends={friends}
          incomingInvites={incomingInvites}
          outgoingInvites={outgoingInvites}
          alerts={alerts}
        />
      </View>
    </Wrapper>
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
    paddingTop: '32',
    flex: 0.20,
  },
  title: {
    fontFamily: customTheme.boldFontFamily,
    fontSize: 24,
    color: customTheme.colors.gray,
    marginVertical: 16,
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
    flex: 0.65,
    flexDirection: 'column',
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
    flex: 0.2,
    minHeight: 120,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 2,
    alignSelf: 'stretch',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
