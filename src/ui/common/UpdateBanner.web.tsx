import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle,} from 'react-native';
import {customTheme} from '../theme';
import I18n from '../../services/i18n';
import {Icon} from 'react-native-elements';
import {useVersionAPI} from '../../services/state/version/useVersionAPI';

export const UpdateBanner: React.FC = () => {
  const versionAPI = useVersionAPI();

  return versionAPI.state.isUpdateAvailable ? (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => versionAPI.startUpdate()}>
        <Text style={styles.text}>{I18n.t('update.text')}</Text>
        {versionAPI.state.isUpdating ? (
          <ActivityIndicator size={12} color={'#fff'} />
        ) : (
          <Icon
            name={'refresh'}
            type={'font-awesome'}
            size={12}
            color={'#fff'}
          />
        )}
      </TouchableOpacity>
    </View>
  ) : null;
};

type Styles = {
  container: ViewStyle;
  touchable: ViewStyle;
  text: TextStyle;
  cta: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    height: 32,
    backgroundColor: '#314DCB',
    position: 'relative',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
  },
  touchable: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontFamily: customTheme.fontFamily,
    marginHorizontal: 4,
  },
  cta: {
    color: '#fff',
    fontSize: 12,
    fontFamily: customTheme.boldFontFamily,
  },
});
