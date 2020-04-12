import React, {useState} from 'react';
import {OfflineModal} from './OfflineModal';
import {View, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import {useNetInfo} from '@react-native-community/netinfo';

export const OfflineButton: React.FC = (props): JSX.Element | null => {
  const [modalVisible, setModalVisible] = useState(false);
  const netInfo = useNetInfo();

  if (netInfo.isInternetReachable) {
    return null;
  }

  return (
    <View
      style={{
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#157FFB',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 2,
      }}>
      <OfflineModal
        visible={modalVisible}
        close={() => setModalVisible(false)}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon
          name={'cloud-off-outline'}
          type={'MaterialCommunityIcons'}
          style={{
            textAlign: 'center',
            fontSize: 20,
            color: '#fff',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
