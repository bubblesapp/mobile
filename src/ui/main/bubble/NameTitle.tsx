import React from 'react';
import {StyleSheet, Text, TextStyle, View} from 'react-native';
import {Profile} from '@bubblesapp/api';
import {customTheme} from '../../theme';

type Props = {
  profile: Profile;
};

export const NameTitle: React.FC<Props> = ({profile}) => {
  return (
    <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
      <Text style={styles.title} numberOfLines={1}>
        {profile.name}
      </Text>
      <Text style={styles.subtitle} numberOfLines={1}>{` (${
        profile.email.split('@')[0]
      })`}</Text>
    </View>
  );
};

type Styles = {
  title: TextStyle;
  subtitle: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  title: {
    fontFamily: customTheme.boldFontFamily,
    fontSize: 16,
    marginEnd: 4,
  },
  subtitle: {
    fontFamily: customTheme.fontFamily,
    color: customTheme.colors.gray,
  },
});
