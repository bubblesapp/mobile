import React, {useEffect, useState} from 'react';
import {
  Platform,
  Share,
  ShareContent,
  ShareOptions,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {customTheme} from '../../theme';
import {Input} from 'react-native-elements';
import {SubmitButton} from '../../common/SubmitButton';
import {CloseButton} from '../../common/CloseButton';
import {useAuth} from '../../../services/auth/useAuth';
import {InviteButton} from '../../common/InviteButton';
import I18n from '../../../services/i18n';
import {ExtraButton} from '../../common/ExtraButton';
import {useToast} from '../../common/Toast';
import Clipboard from '@react-native-community/clipboard';
import ENV from '../../../../environment';
import env from '../../../../active.env';
import {Analytics, Events} from '../../../services/analytics/Analytics';
import {useNavigation} from '@react-navigation/native';
import {useAPI} from '../../../services/api/useAPI';
import {Link} from '@bubblesapp/api';
import {Routes} from '../../../services/navigation/Routes';

type Props = {
  onCancel: () => void;
  visible: boolean;
};

const copy = (elementId: string) => {
  const input = document.getElementById(elementId) as HTMLInputElement | null;
  const isiOSDevice = navigator.userAgent.match(/ipad|iphone/i);

  if (input) {
    if (isiOSDevice) {
      const editable = input.contentEditable;
      const readOnly = input.readOnly;

      input.contentEditable = 'true';
      input.readOnly = false;

      const range = document.createRange();
      range.selectNodeContents(input);

      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);

      input.setSelectionRange(0, 999999);
      input.contentEditable = editable;
      input.readOnly = readOnly;
    } else {
      input.select();
    }
    document.execCommand('copy');
  }
};

export const InviteModal: React.FC<Props> = () => {
  let [link, setLink] = useState<Link>();
  const auth = useAuth();
  const nav = useNavigation();
  const api = useAPI();

  const close = () => {
    nav.navigate(Routes.BubbleNavigator, {
      screen: Routes.Bubble,
    });
  };

  useEffect(() => {
    const linkSubscription = api.links.observe().subscribe(setLink);
    return () => linkSubscription.unsubscribe();
  }, [api]);

  link = link || {
    url: `${ENV[env].baseUrl}?mode=invite&n=${auth.state.name}&e=${auth.state.email}`,
  };
  const shareContent = {
    title: I18n.t('bubble.invites.shareMessageTitle'),
    text: I18n.t('bubble.invites.shareMessageContent').replace('$0', link.url),
    message: I18n.t('bubble.invites.shareMessageContent').replace(
      '$0',
      link.url,
    ),
  };
  const shareOptions: ShareOptions = {
    subject: I18n.t('bubble.invites.shareMessageTitle'),
  };

  const copyLinkToClipboard = async () => {
    if (Platform.OS === 'web') {
      copy('linkInput');
      Toast.success(I18n.t('bubble.invites.copiedToClipboard'));
    } else {
      if (link?.url) {
        Clipboard.setString(link?.url);
      }
      Toast.success(I18n.t('bubble.invites.copiedToClipboard'));
    }
    Analytics.logEvent(Events.CopyBubbleLink);
  };

  const shareLink = async () => {
    try {
      // @ts-ignore
      if (Platform.OS === 'web' && navigator.share) {
        // @ts-ignore
        navigator.share(shareContent);
      } else {
        await Share.share(shareContent as ShareContent, shareOptions);
      }
      Analytics.logEvent(Events.ShareBubbleLink);
    } catch (err) {
      console.log(err.message);
      await copyLinkToClipboard();
    }
  };

  const Toast = useToast();
  return (
    <>
      <View style={styles.header}>
        <View style={styles.closeButton}>
          <CloseButton onPress={() => close()} />
        </View>
        <InviteButton />
        <Text style={styles.headerTitle}>{I18n.t('bubble.invites.title')}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.heading1}>
          {I18n.t('bubble.invites.linkInstructions')}
        </Text>
        <Text style={styles.linkLabel}>
          {I18n.t('bubble.invites.linkLabel')}
        </Text>
        <TouchableOpacity
          style={{alignSelf: 'stretch', padding: 0}}
          onPress={() => copyLinkToClipboard()}>
          <Input
            containerStyle={{
              alignSelf: 'stretch',
              paddingLeft: 0,
              paddingRight: 0,
              paddingBottom: 0,
            }}
            nativeID={'linkInput'}
            disabled={true}
            disabledInputStyle={{color: '#000', opacity: 1}}
            inputContainerStyle={styles.linkContainer}
            inputStyle={styles.linkText}
            value={link.url}
            multiline={true}
            numberOfLines={3}
            errorStyle={{display: 'none'}}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            alignSelf: 'stretch',
          }}>
          <ExtraButton
            onPress={() => copyLinkToClipboard()}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            title={I18n.t('bubble.invites.copyButton')}
          />
          <View style={{width: 24}} />
          <SubmitButton
            onPress={() => shareLink()}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            title={I18n.t('bubble.invites.shareButton')}
          />
        </View>
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
  linkLabel: TextStyle;
  linkContainer: ViewStyle;
  linkText: TextStyle;
  buttonContainer: ViewStyle;
  button: ViewStyle;
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
  linkLabel: {
    color: customTheme.colors.gray,
    fontFamily: customTheme.fontFamily,
    fontSize: 14,
    alignSelf: 'flex-start',
  },
  linkContainer: {
    borderWidth: 1,
    borderColor: customTheme.colors.mediumGray,
    borderRadius: 10,
    padding: 8,
    alignSelf: 'stretch',
  },
  linkText: {
    fontFamily: customTheme.fontFamily,
    fontSize: 12,
    textAlign: 'left',
  },
  buttonContainer: {
    flex: 1,
    marginTop: 24,
  },
  button: {},
});
