import React from 'react';
import {View, Text, TextStyle, StyleSheet, ViewStyle} from 'react-native';
import {FormikErrors} from 'formik';
import {Icon} from 'native-base';
import _ from 'lodash';

interface Props {
  message?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
}

interface Styles {
  container: ViewStyle;
  message: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    color: '#666',
    fontWeight: '500',
  },
});

export const FieldError: React.FC<Props> = ({message}): JSX.Element | null => {
  return message ? (
    <View style={styles.container}>
      <Icon
        name="info-circle"
        type={'FontAwesome5'}
        style={{color: '#666', marginRight: 8, fontSize: 14}}
      />
      <Text style={styles.message}>{_.capitalize(message.toString())}</Text>
    </View>
  ) : null;
};
