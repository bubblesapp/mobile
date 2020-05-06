import React from 'react';
import I18n from '../../i18n';
import {HeaderBackButton} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

export const BackButton: React.FC = () => {
  const nav = useNavigation();
  return (
    <HeaderBackButton
      label={I18n.t('profile.title')}
      onPress={() => nav.goBack()}
    />
  )
};
