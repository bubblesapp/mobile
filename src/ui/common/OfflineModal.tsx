import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Icon, Text} from 'native-base';

export type Props = {
  visible: boolean;
  close: () => void;
};

export const OfflineModal: React.FC<Props> = ({
  visible,
  close,
}): JSX.Element => {
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
            <View style={{flex: 0.33, alignItems: 'center'}}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: '#157FFB',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name={'cloud-off-outline'}
                  type={'MaterialCommunityIcons'}
                  style={{color: '#fff', fontSize: 25}}
                />
              </View>
              <Text style={{marginVertical: 20, fontWeight: 'bold'}}>
                Offline Mode
              </Text>
            </View>
            <View style={{flex: 0.33, justifyContent: 'center'}}>
              <Text
                style={{
                  marginVertical: 5,
                  textAlign: 'center',
                  lineHeight: 20,
                  fontSize: 14,
                }}>
                Some features are disabled.
              </Text>
              <Text
                style={{
                  marginVertical: 5,
                  textAlign: 'center',
                  lineHeight: 20,
                  fontSize: 14,
                }}>
                An internet connection is necessary to know if your bubble
                popped.
              </Text>
              <Text
                style={{
                  marginVertical: 5,
                  textAlign: 'center',
                  lineHeight: 20,
                  fontSize: 14,
                }}>
                You can still invite or remove friends, accept or decline
                invites, and update 'last met' times. These changes will sync
                when you're back online.
              </Text>
            </View>
            <View
              style={{
                flex: 0.33,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => close()}>
                <Text style={{color: '#157FFB'}}>Close</Text>
              </TouchableOpacity>
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
