import React, {useEffect, useState} from 'react';
import {SmallSpinner} from '../common/Spinner';
import {Image, Modal as ModalNative, Platform, Text, View} from 'react-native';
import ModalWeb from 'modal-react-native-web';
import {Overlay} from 'react-native-elements';
import {useAuth} from '../../auth/Auth';
import {useToast} from '../Toast';
import I18n from '../../i18n'
import {authStyleSheet} from './Styles';
import {commonStyles} from '../common/Styles';
import {SubmitButton} from '../common/SubmitButton';

const Modal = Platform.OS === 'web' ? ModalWeb : ModalNative;

type Props = {
  oobCode: string;
};

export const VerifyEmail: React.FC<Props> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const auth = useAuth();
  const Toast = useToast();

  useEffect(() => {
    if (auth.state?.emailVerified || !props.oobCode) {
      setIsVisible(false);
      return;
    }
    setIsVisible(true);
    // Verify code and refresh auth state
    auth
      .verifyEmail(props.oobCode)
      .then(() => {
        setIsVisible(false);
        Toast.success(I18n.t('auth.emailVerificationSuccess'));
      })
      .catch((err) => {
        console.log(err);
        setIsVisible(false);
        Toast.danger(err.message);
      })
      .then(() => {
        if (Platform.OS === 'web') {
          window.location.search = '';
        }
      });
  }, []);

  return (
    <Overlay
      overlayStyle={[authStyleSheet.overlay, {backgroundColor: '#fff'}]}
      isVisible={isVisible}
      ModalComponent={Modal}>
      <View style={commonStyles.popupWrapper}>
        <View style={commonStyles.popupHeader}>
          <Image
            source={require('../../../assets/images/EmailVerification.png')}
            style={{
              width: 75,
              height: 75,
              marginBottom: 24,
            }}
          />
          <Text style={commonStyles.popupTitle}>{I18n.t('auth.emailVerificationLoading')}</Text>
        </View>
        <View style={commonStyles.popupContent}>
          <SmallSpinner />
          <SubmitButton
            onPress={() => setIsVisible(false)}
            containerStyle={{marginTop: 24}}
            title={I18n.t('auth.close')}
          />
        </View>
      </View>
    </Overlay>
  );
};
