import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {customTheme} from '../../theme/theme';

export const InviteButton: React.FC = () => {
  return (
    <View style={styles.outerCircle}>
      <View style={styles.innerCircle}>
        <FontAwesome5
          name={'plus'}
          color={'#fff'}
          size={22}
          style={{lineHeight: 44}}
        />
      </View>
    </View>
  );
};

type Styles = {
  outerCircle: ViewStyle;
  innerCircle: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  outerCircle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 52,
    height: 52,
    backgroundColor: customTheme.colors.ctaBackgroundLight,
    borderRadius: 26,
  },
  innerCircle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
    backgroundColor: customTheme.colors.ctaBackground,
    borderRadius: 22,
  },
});
