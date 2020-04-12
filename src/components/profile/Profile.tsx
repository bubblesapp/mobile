import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Icon,
  Left,
  Right,
  Switch,
  Text,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Routes} from '../../nav/Routes';
import {CompositeNavigationProp} from '@react-navigation/core';
import {
  ProfileNavigatorNavigationProp,
  ProfileStackParamsList,
} from './ProfileNavigator';
import I18n from '../../i18n/';
import Toast from '../common/Toast';
import {useAuth} from '../../auth/Auth';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';
import {AppState, Linking, Platform} from 'react-native';
import {useAPI} from '../../api/useAPI';
import {Profile as ProfileModel} from '../../models/Profile';

export type ProfileNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ProfileStackParamsList, Routes.Profile>,
  ProfileNavigatorNavigationProp
>;

const LeftText: React.FC = ({children}): JSX.Element => (
  <Left style={{flexGrow: 1}}>
    <Text numberOfLines={1}>{children}</Text>
  </Left>
);

const RightShrink: React.FC = ({children}): JSX.Element => (
  <Right style={{flex: 0}}>{children}</Right>
);

export const Profile: React.FC = (): JSX.Element => {
  const [profile, setProfile] = useState<ProfileModel>();
  const navigation = useNavigation<ProfileNavigationProp>();
  const auth = useAuth();
  const api = useAPI();

  useEffect(() => {
    if (auth.state?.uid) {
      const profileSubscription = api
        .observeProfile(auth.state?.uid)
        .subscribe(setProfile);
      return () => profileSubscription.unsubscribe();
    }
  }, []);

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
        await api.setPushNotifications(false);
        return;
      case firebase.messaging.AuthorizationStatus.NOT_DETERMINED:
        await api.setPushNotifications(false);
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

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (e) {
      await Toast.danger(e.message);
    }
  };

  const switchPushNotifications = async (enabled: boolean) => {
    if (enabled) {
      // User requested activation
      await api.setPushNotifications(true);
      if (Platform.OS === 'ios') {
        const permission = await firebase.messaging().hasPermission();
        if (
          permission === firebase.messaging.AuthorizationStatus.NOT_DETERMINED
        ) {
          const newPermission = await firebase.messaging().requestPermission();
          if (
            newPermission === firebase.messaging.AuthorizationStatus.AUTHORIZED
          ) {
            await api.setPushNotifications(true);
          } else {
            await api.setPushNotifications(false);
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
      await api.setPushNotifications(false);
    }
  };

  const switchEmailNotifications = (enabled: boolean) => {
    console.log('Email notifications', enabled);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: I18n.t('profile.title'),
    });
  }, [navigation]);

  return (
    <Container>
      <Content padder>
        <Card>
          <CardItem header>
            <Text>{I18n.t('profile.credentials')}</Text>
          </CardItem>
          <CardItem
            button={true}
            onPress={() => navigation.navigate(Routes.ChangeEmail)}>
            <LeftText>{auth.state?.email}</LeftText>
            <RightShrink>
              <Icon name="arrow-forward" />
            </RightShrink>
          </CardItem>
          <CardItem
            button={true}
            onPress={() => navigation.navigate(Routes.ChangePassword)}>
            <LeftText>••••••••</LeftText>
            <RightShrink>
              <Icon name="arrow-forward" />
            </RightShrink>
          </CardItem>
        </Card>
        <Card>
          <CardItem header>
            <Text>{I18n.t('profile.personalInfo')}</Text>
          </CardItem>
          <CardItem
            button={true}
            onPress={() => navigation.navigate(Routes.ChangePersonalInfo)}>
            <LeftText>{auth.state?.name}</LeftText>
            <RightShrink>
              <Icon name="arrow-forward" />
            </RightShrink>
          </CardItem>
        </Card>
        <Card>
          <CardItem header>
            <Text>{I18n.t('profile.notifications')}</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{I18n.t('profile.pushNotifications')}</Text>
            </Body>
            <Right>
              <Switch
                value={profile?.pushNotificationsEnabled}
                onValueChange={async (enabled) =>
                  await switchPushNotifications(enabled)
                }
              />
            </Right>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{I18n.t('profile.emailNotifications')}</Text>
            </Body>
            <Right>
              <Switch
                value={profile?.emailNotificationsEnabled}
                onValueChange={(enabled) => switchEmailNotifications(enabled)}
              />
            </Right>
          </CardItem>
        </Card>
        <Card>
          <CardItem header>
            <Text>{I18n.t('profile.account')}</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Button
                onPress={() => signOut()}
                block
                testID={'signOut'}
                accessibilityLabel={'Sign Out'}>
                <Text style={{fontWeight: 'bold'}}>
                  {I18n.t('profile.logout')}
                </Text>
              </Button>
              <Button
                onPress={() => navigation.navigate(Routes.DeleteAccount)}
                danger
                block
                style={{marginTop: 16}}>
                <Text style={{fontWeight: 'bold'}}>
                  {I18n.t('profile.delete')}
                </Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};
