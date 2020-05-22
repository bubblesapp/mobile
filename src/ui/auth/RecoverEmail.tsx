import {ActivityIndicator, Modal as ModalNative, Platform, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAuth} from '../../services/auth/useAuth';
import {useToast} from '../common/Toast';
import I18n from '../../services/i18n';
import {Overlay} from 'react-native-elements';
import ModalWeb from 'modal-react-native-web';

const Modal = Platform.OS === 'web' ? ModalWeb : ModalNative;

type Props = {
  oobCode: string;
};

export const RecoverEmail: React.FC<Props> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const auth = useAuth();
  const Toast = useToast();

  useEffect(() => {
    if (!props.oobCode) {
      setIsVisible(false);
      return;
    }
    setIsVisible(true);
    // Verify code and refresh auth state
    auth
      .restoreEmail(props.oobCode)
      .then(() => {
        setIsVisible(false);
        Toast.success(I18n.t('auth.emailRestorationLoading'));
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
    <Overlay isVisible={isVisible} ModalComponent={Modal}>
      <>
        <Text>{I18n.t('auth.emailRestorationLoading')}</Text>
        <ActivityIndicator />
      </>
    </Overlay>
  );
};
