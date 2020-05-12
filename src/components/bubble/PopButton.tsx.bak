import React, {useState} from 'react';
import I18n from '../../i18n';
import {PopModal} from './PopModal';
import {SubmitButton} from '../common/SubmitButton';
import {Text} from 'react-native';
import {Card} from 'react-native-elements';

export const PopButton: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const pop = async () => {
    setModalVisible(true);
  };

  return (
    <>
      <PopModal
        visible={modalVisible}
        close={() => setModalVisible(false)}
        proceed={() => pop()}
      />
      <Card title={I18n.t('bubble.popButton.title')}>
        <Text style={{fontSize: 14, textAlign: 'justify'}}>
          {I18n.t('bubble.popButton.note')}
        </Text>
        <SubmitButton
          testID={'popButton'}
          accessibilityLabel={'Pop Bubble'}
          label={I18n.t('bubble.popButton.title')}
          onPress={() => pop()}
        />
      </Card>
    </>
  );
};
