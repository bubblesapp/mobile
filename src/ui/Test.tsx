import React from 'react';
import {Button, Platform, SafeAreaView, Text, View} from 'react-native';

export const Test: React.FC = () => {
  console.log(Platform.OS === 'web', window.navigator.standalone);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f00', paddingTop: 32}}>
      <Text>Test v6</Text>
      <Text>
        Standalone:{' '}
        {(Platform.OS === 'web' && window.navigator.standalone)?.toString()}
      </Text>
      <Button
        title={'Refresh'}
        onPress={() => Platform.OS === 'web' && document.location.reload(true)}
      />
      <Button
        title={'Enable notifications'}
        onPress={async () => {
          if (Platform.OS === 'web' && 'Notification' in window) {
            const permission = await window.Notification.requestPermission();
            console.log(permission);
          }
        }}
      />
    </SafeAreaView>
  );
};
