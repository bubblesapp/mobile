import React, {useState} from 'react';
import {
  Modal as ModalNative,
  StyleSheet,
  View,
  ViewStyle,
  Text,
  Platform,
} from 'react-native';
import ModalWeb from 'modal-react-native-web';
import I18n from '../../i18n';
import {useAPI} from '../../api/useAPI';
import {SubmitButton} from '../common/SubmitButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Button} from 'react-native-elements';
import {useToast} from '../Toast';

export type Props = {
  visible: boolean;
  close: () => void;
  proceed: () => void;
};

const Modal = Platform.OS === 'web' ? ModalWeb : ModalNative;

export const PopModal: React.FC<Props> = ({
  visible,
  close,
  proceed,
}): JSX.Element => {
  const [isPoppingBubble, setIsPoppingBubble] = useState<boolean>(false);
  const api = useAPI();
  const Toast = useToast();
  const pop = async () => {
    setIsPoppingBubble(true);
    try {
      await api.bubble.pop();
    } catch (err) {
      Toast.danger(err.messaging);
    } finally {
      setIsPoppingBubble(false);
      close();
    }
  };
  return (
    <Modal
      transparent={false}
      visible={visible}
      animationType={'fade'}
      supportedOrientations={['portrait', 'landscape']}>
      <View style={styles.modalContainer}>
        <View style={styles.modalSubContainer}>
          <View
            style={{
              flex: 1,
              margin: 40,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 0.33,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FontAwesome5
                name={'exclamation-triangle'}
                style={{color: '#d9534f', fontSize: 55}}
              />
              <Text style={{marginVertical: 20, fontWeight: 'bold'}}>
                Confirmation
              </Text>
            </View>
            <View
              style={{
                flex: 0.33,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  marginVertical: 5,
                  textAlign: 'center',
                  lineHeight: 20,
                  fontSize: 14,
                }}>
                Popping your bubble means you are, or might not be safe anymore.
              </Text>
              <Text
                style={{
                  marginVertical: 5,
                  textAlign: 'center',
                  lineHeight: 20,
                  fontSize: 14,
                }}>
                All people in your bubble you met with recently will be notified
                anonymously, and their bubbles might pop too.
              </Text>
            </View>
            <View
              style={{
                flex: 0.33,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <SubmitButton
                testID={'confirmPopButton'}
                accessibilityLabel={'Proceed'}
                label={I18n.t('bubble.popModal.proceed')}
                onPress={() => pop()}
              />
              <Button
                title={I18n.t('bubble.popModal.cancel')}
                style={{marginTop: 20}}
                onPress={() => close()}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export type Styles = {
  modalContainer: ViewStyle;
  modalSubContainer: ViewStyle;
  modalActivityIndicator: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalSubContainer: {
    flex: 0.8,
    width: '90%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalActivityIndicator: {
    marginTop: 16,
  },
});
