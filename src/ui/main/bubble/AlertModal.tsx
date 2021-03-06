import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import assets from '../../assets';
import {customTheme} from '../../theme';
import {SubmitButton} from '../../common/SubmitButton';
import {CloseButton} from '../../common/CloseButton';
import I18n from '../../../services/i18n';
import {Friend} from '@bubblesapp/api';
import {FriendSelectedItem} from './FriendSelectItem';
import _ from 'lodash';
import moment from 'moment';
import Constants from '../../../services/util/Constants';
import {RecentFriendsItem} from './RecentFriendsItem';
import {ExtraButton} from '../../common/ExtraButton';
import {useAPI} from '../../../services/api/useAPI';
import {useToast} from '../../common/Toast';
import {Analytics, Events} from '../../../services/analytics/Analytics';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../../services/navigation/Routes';

type Props = {
  onCancel?: () => void;
  onAlertSent?: () => void;
  visible: boolean;
};

const recentLimit =
  moment().subtract(Constants.RECENT_LIMIT_DAYS, 'days').startOf('day').unix() *
  1000;

const seenRecently = (friend: Friend) =>
  friend.lastMet && friend.lastMet > recentLimit;

const isArrayEqual = <T,>(x: T[], y: T[]) => {
  return !_.isEmpty(x) && _(x).differenceWith(y, _.isEqual).isEmpty();
};

export const AlertModal: React.FC<Props> = () => {
  const [step, setStep] = useState(1);
  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);
  const [message, setMessage] = useState('');
  const [sendingAlert, setSendingAlert] = useState(false);
  //const [openingMailApp, setOpeningEmailApp] = useState(false);
  const Toast = useToast();
  const nav = useNavigation();

  const close = () => {
    nav.navigate(Routes.BubbleNavigator, {
      screen: Routes.Bubble,
    });
  };

  const selectFriend = (friend: Friend) =>
    setSelectedFriends([friend, ...selectedFriends]);
  const deSelectFriend = (friend: Friend) =>
    setSelectedFriends(_.filter(selectedFriends, (f) => f.uid !== friend.uid));

  const api = useAPI();
  const [friends, setFriends] = useState<Friend[]>([]);
  useEffect(() => {
    const friendsSubscription = api.friends.observeAll().subscribe(setFriends);
    return () => friendsSubscription.unsubscribe();
  }, [api]);

  const allSeenRecently = friends.filter(seenRecently);

  const selectRecent = () => {
    setSelectedFriends(allSeenRecently);
  };

  const deselectRecent = () => {
    setSelectedFriends(selectedFriends.filter((f) => !seenRecently(f)));
  };

  const [charactersLeft, setCharactersLeft] = useState(
    Constants.ALERT_MESSAGE_MAX_CHARACTERS,
  );

  const sendAlert = async () => {
    try {
      setSendingAlert(true);
      const id = await api.newAlerts.sendAlert(
        selectedFriends.map((f) => f.uid),
        message,
      );
      await api.alerts.waitUntilExists(id);
      setSendingAlert(false);
      Toast.success(I18n.t('bubble.alerts.alertSent'));
      Analytics.logEvent(Events.SendAlert);
      //props.onAlertSent && props.onAlertSent();
      close();
    } catch (err) {
      setSendingAlert(false);
      Toast.danger(err.message);
    }
  };

  /* const writeEmail = async () => {
    /* const emails = await Promise.all(
      selectedFriends.map((f) => api.profiles.get(f.uid).then((p) => p.email)),
    );
    //const url = `mailto:${_.join(emails, ';')}`;
    try {
      setOpeningEmailApp(true);
      await Linking.openURL(url);
    } catch (err) {
      Toast.danger('An error occured');
    } finally {
      setOpeningEmailApp(false);
    }
  }; */

  return (
    <>
      <View style={styles.header}>
        <View style={styles.closeButton}>
          <CloseButton onPress={() => close()} />
        </View>
        <Image
          source={assets.images.bubble.alert}
          style={{width: 90, height: 90}}
        />
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>
            {I18n.t('bubble.alerts.newAlertTitle')}
          </Text>
          <Text style={styles.headerSubtitle}>
            {I18n.t('bubble.alerts.newAlertSubtitle')}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.stepText}>{`${step}/2`}</Text>
        {step === 1 ? (
          <>
            <Text style={styles.heading1}>
              {I18n.t('bubble.alerts.newAlertWho')}
            </Text>
            <FlatList<Friend>
              style={{alignSelf: 'stretch'}}
              data={_.orderBy(friends, (f) => f.lastMet ?? 0, 'desc')}
              scrollEnabled={true}
              ListHeaderComponent={
                <RecentFriendsItem
                  selected={isArrayEqual(allSeenRecently, selectedFriends)}
                  onSelected={() => selectRecent()}
                  onDeselected={() => deselectRecent()}
                />
              }
              //ListEmptyComponent={<Text>Empty</Text>}
              renderItem={({item: friend}) => (
                <FriendSelectedItem
                  friend={friend}
                  selected={_.includes(selectedFriends, friend)}
                  onSelected={(f) => deSelectFriend(f)}
                  onDeselected={(f) => selectFriend(f)}
                  disabled={!seenRecently(friend)}
                />
              )}
              keyExtractor={(friend, index) => friend.uid + index}
            />
            {selectedFriends.length > 0 ? (
              <View style={styles.floatingButtonContainer}>
                <SubmitButton
                  buttonStyle={[styles.button, styles.buttonShadow]}
                  containerStyle={[styles.buttonContainer, {height: 140}]}
                  title={I18n.t('bubble.alerts.newAlertContinueButton')}
                  onPress={() => setStep(2)}
                  //title={I18n.t('bubble.alerts.newAlertOpenMailApp')}
                  //onPress={() => writeEmail()}
                  //loading={openingMailApp}
                />
              </View>
            ) : null}
          </>
        ) : step === 2 ? (
          <ScrollView
            style={{alignSelf: 'stretch'}}
            contentContainerStyle={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.heading1}>
              {I18n.t('bubble.alerts.newAlertWhy')}
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: customTheme.colors.mediumGray,
                borderRadius: 10,
                padding: 16,
                alignSelf: 'stretch',
                margin: 16,
              }}>
              <TextInput
                style={{
                  height: 100,
                  textAlign: 'left',
                  fontFamily: customTheme.fontFamily,
                  outline: 'none',
                }}
                multiline={true}
                underlineColorAndroid={'transparent'}
                autoCorrect={false}
                autoCapitalize={'none'}
                maxLength={Constants.ALERT_MESSAGE_MAX_CHARACTERS}
                onChangeText={(text) => {
                  if (charactersLeft >= 0) {
                    setMessage(text);
                    setCharactersLeft(
                      Constants.ALERT_MESSAGE_MAX_CHARACTERS - message.length,
                    );
                  }
                }}
                value={message}
                placeholder={I18n.t('bubble.alerts.newAlertMessagePlaceholder')}
                placeholderTextColor={customTheme.colors.mediumGray}
              />
            </View>
            <Text
              style={{
                alignSelf: 'stretch',
                marginHorizontal: 16,
                fontFamily: customTheme.fontFamily,
                color: customTheme.colors.gray,
              }}>
              {I18n.t('bubble.alerts.newAlertMessageLabel').replace(
                '$0',
                charactersLeft.toString(),
              )}
            </Text>
            <View style={styles.buttonsContainer}>
              <ExtraButton
                onPress={() => setStep(1)}
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
                title={'Back'}
              />
              <View style={{width: 24}} />
              <SubmitButton
                onPress={() => sendAlert()}
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
                loading={sendingAlert}
                title={I18n.t('bubble.alerts.newAlertSendButton')}
              />
            </View>
          </ScrollView>
        ) : null}
      </View>
    </>
  );
};

type Styles = {
  overlay: ViewStyle;
  closeButton: ViewStyle;
  header: ViewStyle;
  headerTitleContainer: ViewStyle;
  headerTitle: ViewStyle;
  headerSubtitle: ViewStyle;
  content: ViewStyle;
  stepText: TextStyle;
  heading1: TextStyle;
  heading2: TextStyle;
  floatingButtonContainer: ViewStyle;
  buttonsContainer: ViewStyle;
  buttonContainer: ViewStyle;
  button: ViewStyle;
  buttonShadow: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  overlay: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 0,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  closeButton: {
    position: 'absolute',
    top: 18,
    right: 18,
  },
  header: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: customTheme.colors.red,
    padding: 32,
  },
  headerTitleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontFamily: customTheme.boldFontFamily,
    fontSize: 20,
  },
  headerSubtitle: {
    color: '#fff',
    fontFamily: customTheme.boldFontFamily,
    fontSize: 16,
  },
  content: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 8,
  },
  stepText: {
    color: customTheme.colors.mediumGray,
    fontFamily: customTheme.boldFontFamily,
    marginVertical: 8,
    fontSize: 12,
  },
  heading1: {
    fontFamily: customTheme.boldFontFamily,
    fontSize: 14,
  },
  heading2: {
    fontFamily: customTheme.fontFamily,
    fontSize: 14,
    textAlign: 'center',
  },
  floatingButtonContainer: {
    backgroundColor: 'rgba(255, 0, 0, 0)',
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginHorizontal: 16,
    marginTop: 24,
  },
  buttonContainer: {
    backgroundColor: 'rgba(0, 255, 0, 0)',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  button: {},
  buttonShadow: {
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
    shadowColor: '#000',
  },
});
