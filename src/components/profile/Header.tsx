import React from 'react';
import {BackButton} from '../common/BackButton';
import {Text, View} from 'react-native';
import {profileStyles as styles} from './Styles';

type Props = {
  title: string;
  color?: string;
};

export const Header: React.FC<Props> = ({title, color}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
      }}>
      <BackButton color={color} />
      <Text style={[styles.title, {color}]}>{title}</Text>
      <View style={{width: 32, marginRight: 32}} />
    </View>
  );
};
