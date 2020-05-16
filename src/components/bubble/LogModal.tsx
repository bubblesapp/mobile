import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  ViewStyle,
  Text,
  TextStyle,
  Platform,
  Modal as ModalNative,
} from 'react-native';
import assets from '../../assets';
import {customTheme} from '../../theme/theme';
import ModalWeb from 'modal-react-native-web';
import {Overlay} from 'react-native-elements';
import {DayPicker} from './DayPicker';
import {SubmitButton} from '../common/SubmitButton';
import {CloseButton} from '../common/CloseButton';
import {Friend, Profile} from '@bubblesapp/api';
import {useAPI} from '../../api/useAPI';
import I18n from '../../i18n';
import {commonStyles} from '../common/Styles';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {BubbleStackParamsList} from './BubbleNavigator';
import {Routes} from '../../nav/Routes';
import {useAuth} from '../../auth/Auth';
import {Analytics, Events} from '../../analytics/Analytics';

const Modal = Platform.OS === 'web' ? ModalWeb : ModalNative;

type Props = {
  onCancel: () => void;
  onDatePicked: (date: Date) => void;
  visible: boolean;
  friend?: Friend;
};

type LogRouteProp = RouteProp<BubbleStackParamsList, Routes.Log>;

export const LogModal: React.FC<Props> = (props) => {
  const [date, setDate] = useState(new Date());
  const [profile, setProfile] = useState<Profile>();
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const api = useAPI();
  const nav = useNavigation();
  const {params} = useRoute<LogRouteProp>();

  const setLastMet = async () => {
    if (typeof auth.getCurrentUser() !== 'undefined' && params.friend) {
      setLoading(true)
      const uid = auth.getCurrentUser() as string;
      const lastMet = date.getTime();
      await api.friends.update({lastMet}, params.friend.uid, uid);
      await api.friends.update({lastMet}, uid, params.friend.uid);
      Analytics.logEvent(Events.SetLastMetDate);
      setLoading(false)
      nav.goBack();
    }
  };

  useEffect(() => {
    const profileSubscription = api.profiles
      .observe(params.friend?.uid)
      .subscribe(setProfile);
    return () => profileSubscription.unsubscribe();
  }, [api, params.friend]);

  return (
    <>
      <View style={styles.header}>
        <View style={styles.closeButton}>
          <CloseButton onPress={() => nav.goBack()} />
        </View>
        <Image
          source={assets.images.bubble.notepadBig}
          style={{width: 64, height: 64}}
        />
        <Text style={styles.headerTitle}>
          {I18n.t('bubble.friends.logTitle')}
        </Text>
        <Text style={styles.headerSubtitle}>{profile?.name}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.heading1}>
          {I18n.t('bubble.friends.logQuestion').replace(
            '$0',
            profile?.name ?? '',
          )}
        </Text>
        <Text style={styles.heading2}>
          {I18n.t('bubble.friends.logExplanation')}
        </Text>
        <DayPicker onChange={(d) => setDate(d)} />
        <SubmitButton
          loading={loading}
          containerStyle={styles.buttonContainer}
          title={I18n.t('bubble.friends.logButton')}
          onPress={() => setLastMet()}
        />
      </View>
    </>
  );
};

type Styles = {
  overlay: ViewStyle;
  closeButton: ViewStyle;
  header: ViewStyle;
  headerTitle: ViewStyle;
  headerSubtitle: ViewStyle;
  content: ViewStyle;
  heading1: TextStyle;
  heading2: TextStyle;
  buttonContainer: ViewStyle;
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
    backgroundColor: customTheme.colors.ctaBackground,
    padding: 32,
  },
  headerTitle: {
    color: '#fff',
    fontFamily: customTheme.boldFontFamily,
    fontSize: 20,
  },
  headerSubtitle: {
    color: '#fff',
    fontFamily: customTheme.boldFontFamily,
    fontSize: 24,
  },
  content: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 32,
  },
  heading1: {
    fontFamily: customTheme.boldFontFamily,
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  heading2: {
    fontFamily: customTheme.fontFamily,
    fontSize: 14,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 32,
  },
});
