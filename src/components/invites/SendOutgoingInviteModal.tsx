import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Modal as ModalNative,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import ModalWeb from 'modal-react-native-web';
import {customTheme} from '../../theme/theme';
import {useAPI} from '../../api/useAPI';
import I18n from '../../i18n';
import {useToast} from '../Toast';
import {useAuth} from '../../auth/Auth';
import {commonStyles} from '../common/Styles';

const Modal = Platform.OS === 'web' ? ModalWeb : ModalNative;

type Props = {
  toEmail: string;
  toName: string;
};

export const SendOutgoingInviteModal: React.FC<Props> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  const api = useAPI();
  const Toast = useToast();

  const invite = async () => {
    try {
      setIsVisible(true);
      setLoading(true);
      console.log('Sending outgoing invite', props.toEmail);
      await api.invites.invite(props.toEmail);
      Toast.success(
        I18n.t('bubble.newInvite.inviteSent').replace('$0', props.toName),
      );
    } catch (err) {
      Toast.danger(err.message);
    } finally {
      setLoading(false);
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (auth.state.uid /* && auth.state.emailVerified*/) {
      (async () => {
        await invite();
        if (Platform.OS === 'web') {
          window.history.pushState(
            null,
            window.history.state?.title || 'Bubbles',
            '/',
          );
        }
      })();
    }
  }, [auth.state.uid]);

  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={[commonStyles.overlay, styles.overlay]}
      ModalComponent={Modal}>
      <View style={styles.container}>
        <Text style={styles.title}>Joining {props.toName}'s Bubble</Text>
        {loading && <ActivityIndicator style={styles.spinner} />}
      </View>
    </Overlay>
  );
};

type Styles = {
  overlay: ViewStyle;
  container: ViewStyle;
  title: TextStyle;
  spinner: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  overlay: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 0,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    color: customTheme.colors.ctaBackground,
    fontFamily: customTheme.boldFontFamily,
    fontSize: 16,
  },
  spinner: {
    marginTop: 24,
  },
});
