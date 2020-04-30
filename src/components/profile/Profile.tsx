import React, {useEffect, useState} from 'react';
import {Routes} from '../../nav/NavProvider';
import I18n from '../../i18n/';
import {useAuth} from '../../auth/Auth';
import {useAPI} from '../../api/useAPI';
import {Profile as ProfileModel} from '@bubblesapp/api';
import {useNavigation} from '@react-navigation/native';
import {Notifications} from './Notifications';
import {Card, ListItem} from 'react-native-elements';
import {SubmitButton} from '../common/SubmitButton';
import {ScrollView} from 'react-native';
import {useToast} from '../Toast';

export const Profile: React.FC = (): JSX.Element => {
  const [profile, setProfile] = useState<ProfileModel>();
  const nav = useNavigation();
  const auth = useAuth();
  const api = useAPI();
  const Toast = useToast();

  useEffect(() => {
    const profileSubscription = api.profiles.observe().subscribe(setProfile);
    return () => profileSubscription.unsubscribe();
  }, [api]);

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (e) {
      await Toast.danger(e.message);
    }
  };

  return (
    <ScrollView>
      <Card title={I18n.t('profile.credentials')}>
        <ListItem
          onPress={() => nav.navigate(Routes.ChangeEmail)}
          title={auth.state?.email}
          chevron={true}
        />
        <ListItem
          onPress={() => nav.navigate(Routes.ChangePassword)}
          title={'••••••••'}
          chevron={true}
        />
      </Card>
      <Card title={I18n.t('profile.personalInfo')}>
        <ListItem
          onPress={() => nav.navigate(Routes.ChangePersonalInfo)}
          title={auth.state?.name}
          chevron={true}
        />
      </Card>
      <Card title={I18n.t('profile.notifications')}>
        <Notifications profile={profile} />
      </Card>
      <Card title={I18n.t('profile.account')}>
        <SubmitButton
          onPress={() => signOut()}
          testID={'signOut'}
          accessibilityLabel={'Sign Out'}
          label={I18n.t('profile.logout')}
        />
        <SubmitButton
          onPress={() => nav.navigate(Routes.DeleteAccount)}
          style={{marginTop: 16}}
          label={I18n.t('profile.delete')}
        />
      </Card>
    </ScrollView>
  );
};
