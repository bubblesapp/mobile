import React from 'react';
import {profileStyles as styles} from './Styles';
import I18n from '../../i18n';
import {Text} from 'react-native';

export const PasswordNote: React.FC = () => {
  return (
    <Text style={[styles.extraText, {marginLeft: 12, alignSelf: 'flex-start'}]}>
      {I18n.t('profile.passwordNote')}
    </Text>
  );
};
