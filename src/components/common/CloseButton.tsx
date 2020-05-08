import React from 'react';
import {Icon} from 'react-native-elements';
import {customTheme} from '../../theme/theme';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../nav/Routes';

type Props = {
  backgroundColor?: string;
  color?: string;
  onPress?: () => void;
};

export const CloseButton: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        width: 36,
        height: 36,
        backgroundColor: props.backgroundColor,
        borderRadius: 18,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon name={'close'} type={'ant-design'} size={20} color={props.color} />
    </TouchableOpacity>
  );
};

CloseButton.defaultProps = {
  color: '#fff',
  backgroundColor: 'rgba(255,255,255,0.2)',
};
