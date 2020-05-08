import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
} from 'react-native';

export type Props = {
  title: string;
  onPress: () => void;
};

export const DestructiveButton: React.FC<Props> = ({title, onPress}) => {
  return (
    <View style={styles.deleteRow}>
      <TouchableOpacity onPress={() => onPress()} style={styles.deleteButton}>
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
    margin: 1,
    backgroundColor: '#d9534f',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteButton: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontWeight: '600',
  },
});
