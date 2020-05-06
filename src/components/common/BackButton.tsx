import React from 'react';
import {Icon} from 'react-native-elements';
import {customTheme} from '../../theme/theme';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../nav/Routes';

type Props = {
  color?: string;
};

export const BackButton: React.FC<Props> = ({color}) => {
  const nav = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => nav.navigate(Routes.Profile)}
      style={{marginLeft: 32, width: 32}}>
      <Icon
        name={'chevron-thin-left'}
        type={'entypo'}
        size={20}
        color={color}
      />
    </TouchableOpacity>
  );
};

BackButton.defaultProps = {
  color: customTheme.colors.gray,
};
