import React from 'react';
import {Image, Platform, View} from 'react-native';

type Props = {
  imageSource: any;
};

export const ItemIcon: React.FC<Props> = ({imageSource}) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: Platform.OS === 'web' ? 0 : 8,
        marginRight: Platform.OS === 'web' ? 16 : 0,
      }}>
      <Image source={imageSource} style={{width: 18, height: 18}} />
    </View>
  );
};
