import React from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import I18n from '../../../services/i18n';
import {SubmitButton} from '../../common/SubmitButton';
import {Routes} from '../../../services/navigation/Routes';
import {useNavigation} from '@react-navigation/native';
import {customTheme} from '../../theme';

export const PeopleListEmpty: React.FC = () => {
  const nav = useNavigation();
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{I18n.t('bubble.friends.emptyText')}</Text>
      <SubmitButton
        icon={{
          name: 'plus',
          type: 'font-awesome-5',
          color: '#fff',
          size: 18,
          style: {
            marginEnd: 16,
          },
        }}
        containerStyle={styles.buttonContainer}
        title={I18n.t('bubble.friends.emptyButtonTitle')}
        onPress={() => nav.navigate(Routes.Invite)}
      />
    </View>
  );
};

type Styles = {
  wrapper: ViewStyle;
  text: TextStyle;
  buttonContainer: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  wrapper: {
    height: 150,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 32,
  },
  text: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    fontFamily: customTheme.fontFamily,
  },
  buttonContainer: {
    marginTop: 32,
    marginBottom: 24,
  },
});
