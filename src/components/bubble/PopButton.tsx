import React, {useState} from 'react';
import {Button, Card, CardItem, Text} from 'native-base';
import I18n from '../../i18n';
import {useAPI} from '../../api/useAPI.tsx';
import {PopModal} from './PopModal';
import {SubmitButton} from '../common/SubmitButton';

export const PopButton: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isPoppingBubble, setIsPoppingBubble] = useState<boolean>(false);
  const API = useAPI();

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
      <Card>
        <CardItem header={true}>
          <Text>{I18n.t('bubble.popButton.title')}</Text>
        </CardItem>
        <CardItem>
          <Text style={{fontSize: 14, textAlign: 'justify'}}>
            {I18n.t('bubble.popButton.note')}
          </Text>
        </CardItem>
        <CardItem
          onPress={() => setModalVisible(true)}
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <SubmitButton
            testID={'popButton'}
            accessibilityLabel={'Pop Bubble'}
            block={true}
            danger={true}
            label={I18n.t('bubble.popButton.title')}
            onPress={() => pop()}>
          </SubmitButton>
        </CardItem>
      </Card>
    </>
  );
};
