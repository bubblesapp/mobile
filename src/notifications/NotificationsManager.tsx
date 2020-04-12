import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';

export const NotificationsManager: React.FC = (): JSX.Element => {
  useEffect(() => {
    (async () => {
      await messaging().registerDeviceForRemoteMessages();
    })();
  }, []);
  return <></>;
};
