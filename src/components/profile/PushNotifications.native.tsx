import I18n from '../../i18n';
import React, {useEffect} from 'react';
import {useAPI} from '../../api/useAPI';
import {AppState, Linking, Platform} from 'react-native';
import firebase from '@react-native-firebase/app';
import {Profile} from '@bubblesapp/api';
import {ListItem} from 'react-native-elements';
import {profileStyles, profileStyles as styles} from './Styles';
import {ItemIcon} from './ItemIcon';

type Props = {
  profile: Profile;
};

export const PushNotifications: React.FC<Props> = ({profile}) => {
  const api = useAPI();

  const checkPushPermission = async () => {
    if (Platform.OS === 'android') {
      return;
    }
    const permission = await firebase.messaging().hasPermission();
    console.log('Permission settings:', permission);
    switch (permission) {
      case firebase.messaging.AuthorizationStatus.AUTHORIZED:
        return;
      case firebase.messaging.AuthorizationStatus.DENIED:
        await api.profiles.update({pushNotificationsEnabled: false});
        return;
      case firebase.messaging.AuthorizationStatus.NOT_DETERMINED:
        await api.profiles.update({pushNotificationsEnabled: false});
        return;
    }
  };

  const onAppStateChange = async (nextAppState: string) => {
    if (nextAppState === 'active') {
      await checkPushPermission();
      console.log(await firebase.messaging().getToken());
    }
  };

  useEffect(() => {
    AppState.addEventListener('change', onAppStateChange);
    return () => AppState.removeEventListener('change', onAppStateChange);
  }, []);

  const switchPushNotifications = async (enabled: boolean) => {
    if (enabled) {
      // User requested activation
      await api.profiles.update({pushNotificationsEnabled: true});
      if (Platform.OS === 'ios') {
        const permission = await firebase.messaging().hasPermission();
        if (
          permission === firebase.messaging.AuthorizationStatus.NOT_DETERMINED
        ) {
          const newPermission = await firebase.messaging().requestPermission();
          if (
            newPermission === firebase.messaging.AuthorizationStatus.AUTHORIZED
          ) {
            await api.profiles.update({pushNotificationsEnabled: true});
          } else {
            await api.profiles.update({pushNotificationsEnabled: false});
          }
        } else if (
          permission === firebase.messaging.AuthorizationStatus.DENIED
        ) {
          await Linking.openURL(
            'app-settings://notification/org.bubblesapp.bubbles',
          );
        }
      }
    } else {
      // User requested de-activation
      await api.profiles.update({pushNotificationsEnabled: false});
    }
  };

  return (
    <ListItem
      containerStyle={styles.itemContainer}
      leftIcon={<ItemIcon name={'notification'} type={'entypo'} />}
      titleStyle={styles.itemTitleDark}
      title={I18n.t('profile.pushNotifications')}
      bottomDivider={true}
      switch={{
        value: profile?.pushNotificationsEnabled,
        onValueChange: async (enabled) =>
          await switchPushNotifications(enabled),
      }}
    />
  );
};
