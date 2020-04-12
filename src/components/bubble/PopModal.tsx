import React, {useState} from 'react';
import {Modal, StyleSheet, View, ViewStyle,} from 'react-native';
import {Button, Icon, Text} from 'native-base';
import I18n from '../../i18n';
import {boolean} from 'yup';
import {useAuth} from '../../auth/Auth';
import {useAPI} from '../../api/useAPI';
import Toast from '../common/Toast';
import {SubmitButton} from '../common/SubmitButton';

export type Props = {
  visible: boolean;
  close: () => void;
  proceed: () => void;
};

export const PopModal: React.FC<Props> = ({visible, close, proceed}): JSX.Element => {
  const [isPoppingBubble, setIsPoppingBubble] = useState<boolean>(false);
  const auth = useAuth();
  const api = useAPI();
  const pop = async () => {
    setIsPoppingBubble(true);
    try {
      if (auth?.state.uid) {
        await api.popBubble(auth.state.uid);
      }
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
            <View style={{flex: 0.33, alignItems: 'center', justifyContent: 'center'}}>
              <Icon
                name={'exclamation-triangle'}
                type={'FontAwesome5'}
                style={{color: '#d9534f', fontSize: 55}}
              />
              <Text style={{marginVertical: 20, fontWeight: 'bold'}}>
                Confirmation
              </Text>
            </View>
            <View style={{flex: 0.33, alignItems: 'center', justifyContent: 'center'}}>
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
                danger={true}
                block={true}
                onPress={() => pop()}
              />
              <Button
                style={{marginTop: 20}}
                primary={true}
                transparent={true}
                block={true}
                onPress={() => close()}>
                <Text>{I18n.t('bubble.popModal.cancel')}</Text>
              </Button>
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
    flex: 0.6,
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
