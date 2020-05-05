import React from 'react';
import {View, Image} from 'react-native';
import {customTheme} from '../theme/theme';

export const Splash: React.FC = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: customTheme.colors.pink}}>
      <Image
        source={require('../../assets/images/onboarding/Splash.png')}
        style={{width: 304, height: 245}}
      />
    </View>
  );
};
