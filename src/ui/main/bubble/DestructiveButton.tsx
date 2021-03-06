import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
} from 'react-native';
import {customTheme} from '../../theme';

export type Props = {
  title: string;
  onPress?: () => void;
};

export const DestructiveButton: React.FC<Props> = ({title, onPress}) => {
  return (
    <View style={styles.deleteRow}>
      <TouchableOpacity
        onPress={() => onPress && onPress()}
        style={styles.deleteButton}>
        <Text style={styles.deleteText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export type Styles = {
  deleteRow: ViewStyle;
  deleteButton: ViewStyle;
  deleteText: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  deleteRow: {
    backgroundColor: customTheme.colors.red,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteButton: {
    width: 85,
    height: 72,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontWeight: '600',
  },
});
