import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import assets from '../../assets';
import {customTheme} from '../../theme';
import {DayPicker} from './DayPicker';
import {SubmitButton} from '../../common/SubmitButton';
import {CloseButton} from '../../common/CloseButton';
import {Friend, Profile} from '@bubblesapp/api';
import {useAPI} from '../../../services/api/useAPI';
import I18n from '../../../services/i18n';
import {
  RouteProp,
  useLinkBuilder,
  useLinkTo,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {BubbleStackParamsList} from './BubbleNavigator';
import {Routes} from '../../../services/navigation/Routes';
import {useAuth} from '../../../services/auth/useAuth';
import {Analytics, Events} from '../../../services/analytics/Analytics';

type Props = {
  onCancel: () => void;
  onDatePicked: (date: Date) => void;
  visible: boolean;
  //friend?: Friend;
};

type LogRouteProp = RouteProp<BubbleStackParamsList, Routes.Log>;

export const LogModal: React.FC<Props> = () => {
  const [date, setDate] = useState(new Date());
  const [profile, setProfile] = useState<Profile>();
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const api = useAPI();
  const nav = useNavigation();
  const {params} = useRoute<LogRouteProp>();

  if (!params.uid) {
    console.log('Cannot log a contact without an uid');
    return null;
  }

  const close = () => {
    nav.navigate(Routes.BubbleNavigator, {
      screen: Routes.Bubble,
      params: {tab: 'people'},
    });
  };

  const setLastMet = async () => {
    if (auth.state?.uid && params.uid) {
      setLoading(true);
      const uid = auth.state?.uid;
      const lastMet = date.getTime();
      await api.friends.update({lastMet}, params.uid, uid);
      await api.friends.update({lastMet}, uid, params.uid);
      Analytics.logEvent(Events.SetLastMetDate);
      setLoading(false);
      close();
    }
  };

  useEffect(() => {
    const profileSubscription = api.profiles
      .observe(params.uid)
      .subscribe(setProfile);
    return () => profileSubscription.unsubscribe();
  }, [api, params.uid]);

  return (
    <>
      <View style={styles.header}>
        <View style={styles.closeButton}>
          <CloseButton onPress={() => close()} />
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
