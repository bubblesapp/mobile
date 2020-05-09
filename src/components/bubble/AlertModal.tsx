import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Modal as ModalNative,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import assets from '../../assets';
import {customTheme} from '../../theme/theme';
import ModalWeb from 'modal-react-native-web';
import {Overlay} from 'react-native-elements';
import {SubmitButton} from '../common/SubmitButton';
import {CloseButton} from '../common/CloseButton';
import I18n from '../../i18n';
import {Friend} from '@bubblesapp/api';
import {FriendSelectedItem} from './FriendSelectItem';
import _ from 'lodash';
import moment from 'moment';
import Constants from '../../Constants';
import {RecentFriendsItem} from './RecentFriendsItem';
import {ExtraButton} from '../common/ExtraButton';

const Modal = Platform.OS === 'web' ? ModalWeb : ModalNative;

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

export const AlertModal: React.FC<Props> = (props) => {
  const [step, setStep] = useState(1);
  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);
  const [message, setMessage] = useState('');

  const selectFriend = (friend: Friend) =>
    setSelectedFriends([friend, ...selectedFriends]);
  const deSelectFriend = (friend: Friend) =>
    setSelectedFriends(_.filter(selectedFriends, (f) => f.uid !== friend.uid));

  const [friends, setFriends] = useState<Friend[]>([
    {
      uid: 'kjdsbodfjsfo',
      lastMet: 1588836021000,
    },
    {
      uid: 'fffd',
      lastMet: 1588663221000,
    },
    {
      uid: 'kjdsboqsqdsdfjsfo',
      lastMet: 1588922421000,
    },
    {
      uid: 'sfgs',
      lastMet: 2532632762,
    },
    {
      uid: 'rre',
      lastMet: 2532632762,
    },
    {
      uid: 'zqqef',
      lastMet: 2532632762,
    },
    {
      uid: 'dgggf',
      lastMet: 2532632762,
    },
    {
      uid: 'qer',
      lastMet: 2532632762,
    },
  ]);

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

  return (
    <Overlay
      ModalComponent={Modal}
      transparent={true}
      isVisible={props.visible}
      overlayStyle={styles.overlay}
      onBackdropPress={() => props.onCancel && props.onCancel()}
      animationType={'fade'}>
      <>
        <View style={styles.header}>
          <View style={styles.closeButton}>
            <CloseButton onPress={props.onCancel} />
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
                data={friends}
                scrollEnabled={true}
                ListHeaderComponent={
                  <RecentFriendsItem
                    selected={isArrayEqual(allSeenRecently, selectedFriends)}
                    onSelected={() => selectRecent()}
                    onDeselected={() => deselectRecent()}
                  />
                }
                ListEmptyComponent={<Text>Empty</Text>}
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
                    containerStyle={styles.buttonContainer}
                    title={I18n.t('bubble.alerts.newAlertContinueButton')}
                    onPress={() => setStep(2)}
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
                    height: 150,
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
                  placeholder={I18n.t(
                    'bubble.alerts.newAlertMessagePlaceholder',
                  )}
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  alignSelf: 'stretch',
                }}>
                <ExtraButton onPress={() => setStep(1)} title={'Back'} />
                <SubmitButton
                  buttonStyle={styles.button}
                  containerStyle={styles.buttonContainer}
                  title={I18n.t('bubble.alerts.newAlertSendButton')}
                  onPress={() => {}}
                />
              </View>
            </ScrollView>
          ) : null}
        </View>
      </>
    </Overlay>
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
  buttonContainer: ViewStyle;
  button: ViewStyle;
  buttonShadow: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  overlay: {
    width: '80%',
    height: '80%',
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
    backgroundColor: customTheme.colors.orange,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
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
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
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
  },
  buttonContainer: {
    backgroundColor: 'rgba(0, 255, 0, 0)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 140,
  },
  button: {
    paddingHorizontal: 32,
  },
  buttonShadow: {
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
    shadowColor: '#000',
  }
});
