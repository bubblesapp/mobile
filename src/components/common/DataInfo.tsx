import {Icon, Overlay} from 'react-native-elements';
import {customTheme} from '../../theme/theme';
import {Image, Modal as ModalNative, Platform, Text, View} from 'react-native';
import ModalWeb from 'modal-react-native-web';
import React, {useState} from 'react';
import I18n from '../../i18n';
import {SubmitButton} from './SubmitButton';
import {commonStyles} from './Styles';

type Props = {
  text: string;
};

const Modal = Platform.OS === 'web' ? ModalWeb : ModalNative;

export const DataInfo: React.FC<Props> = ({text}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Icon
        name={'info-circle'}
        type={'font-awesome-5'}
        color={customTheme.Input.placeholderTextColor}
        size={20}
        style={{width: 24}}
        onPress={() => {
          if (text) {
            setModalVisible(!modalVisible);
          }
        }}
      />
      <Overlay
        ModalComponent={Modal}
        onBackdropPress={() => setModalVisible(false)}
        isVisible={modalVisible}
        animationType={'fade'}
        supportedOrientations={['portrait', 'landscape']}
        overlayStyle={{maxWidth: '85%', borderRadius: 10,}}>
        <View style={commonStyles.popupWrapper}>
          <View style={commonStyles.popupHeader}>
            <Image
              source={require('../../../assets/images/Vault.png')}
              style={{
                width: 75,
                height: 75,
                marginBottom: 24,
              }}
            />
            <Text style={commonStyles.popupTitle}>{I18n.t('dataInfo')}</Text>
          </View>
          <View style={commonStyles.popupContent}>
            <Text
              style={{
                fontFamily: 'Nunito',
            }}>
              {text}
            </Text>
            <SubmitButton
              onPress={() => setModalVisible(false)}
              containerStyle={{marginTop: 24, alignSelf: 'stretch'}}
              title={I18n.t('auth.close')}
            />
          </View>
        </View>
      </Overlay>
    </>
  )
}
