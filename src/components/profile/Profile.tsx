import React, {useEffect, useState} from 'react';
import {Routes} from '../../nav/Routes';
import I18n from '../../i18n/';
import {useAuth} from '../../auth/Auth';
import {useAPI} from '../../api/useAPI';
import {Profile as ProfileModel} from '@bubblesapp/api';
import {useNavigation} from '@react-navigation/native';
import {Notifications} from './Notifications';
import {ListItem} from 'react-native-elements';
import {Image, Linking, Platform, Text, View} from 'react-native';
import {useToast} from '../Toast';
import {profileStyles as styles} from './Styles';
import {ItemIcon} from './ItemIcon';
import {customTheme} from '../../theme/theme';
import {Wrapper} from '../common/Wrapper';
import assets from '../../assets';
import Constants from 'expo-constants';

const chevronProps = {size: 24, marginEnd: 8};

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
    <Wrapper topColor={customTheme.colors.lightBlue} bottomColor={'#fff'}>
      <View style={styles.header}>
        <Text style={styles.title}>{I18n.t('profile.title')}</Text>
        <View style={styles.headerContent}>
          <Image
            source={assets.images.profile.avatar}
            style={styles.avatarImage}
          />
          <Text style={styles.subtitle}>{profile?.name}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <ListItem
          containerStyle={styles.itemContainer}
          onPress={() => nav.navigate(Routes.ChangeEmail)}
          leftIcon={<ItemIcon imageSource={assets.images.profile.envelope} />}
          title={I18n.t('profile.email')}
          titleStyle={styles.itemTitle}
          subtitle={auth.state?.email}
          subtitleStyle={styles.itemSubtitle}
          chevron={chevronProps}
          bottomDivider={true}
        />
        <ListItem
          containerStyle={styles.itemContainer}
          onPress={() => nav.navigate(Routes.ChangePassword)}
          leftIcon={<ItemIcon imageSource={assets.images.profile.lock} />}
          title={I18n.t('profile.password')}
          titleStyle={styles.itemTitle}
          subtitle={'••••••••'}
          subtitleStyle={styles.itemSubtitle}
          chevron={chevronProps}
          bottomDivider={true}
        />
        <ListItem
          containerStyle={styles.itemContainer}
          onPress={() => nav.navigate(Routes.ChangePersonalInfo)}
          leftIcon={<ItemIcon imageSource={assets.images.profile.circle} />}
          title={I18n.t('profile.username')}
          titleStyle={styles.itemTitle}
          subtitle={auth.state?.name}
          subtitleStyle={styles.itemSubtitle}
          chevron={chevronProps}
          bottomDivider={true}
        />
        <Notifications profile={profile} />
        <ListItem
          containerStyle={styles.itemContainer}
          onPress={() => Linking.openURL('mailto:hello@bubblesapp.org') }
          leftIcon={<ItemIcon imageSource={assets.images.profile.chatBubble} />}
          title={I18n.t('profile.helpTitle')}
          titleStyle={styles.itemTitle}
          subtitle={I18n.t('profile.helpSubtitle')}
          subtitleStyle={styles.itemSubtitle}
          bottomDivider={true}
        />
        <ListItem
          containerStyle={styles.itemContainer}
          onPress={() => nav.navigate(Routes.LegalInfo)}
          leftIcon={<ItemIcon imageSource={assets.images.profile.paper} />}
          title={I18n.t('profile.legalInfo.title')}
          titleStyle={styles.itemTitleDark}
          chevron={chevronProps}
          bottomDivider={true}
        />
        <ListItem
          containerStyle={styles.itemContainer}
          onPress={() => signOut()}
          testID={'signOut'}
          accessibilityLabel={'Sign Out'}
          leftIcon={<ItemIcon imageSource={assets.images.profile.exit} />}
          title={I18n.t('profile.logout')}
          titleStyle={styles.itemTitleDanger}
          bottomDivider={true}
        />
        <ListItem
          containerStyle={[styles.itemContainer, {borderBottomColor: '#fff'}]}
          onPress={() => nav.navigate(Routes.DeleteAccount)}
          leftIcon={<ItemIcon imageSource={assets.images.profile.bin} />}
          title={I18n.t('profile.delete')}
          titleStyle={styles.itemTitleDanger}
          chevron={chevronProps}
        />
        <ListItem
          onPress={() =>
            Platform.OS === 'web' && document.location.reload(true)
          }
          containerStyle={{height: 32}}
          title={`v${Constants.manifest?.version}`}
          titleStyle={{
            textAlign: 'center',
            color: customTheme.colors.mediumGray,
          }}
          bottomDivider={true}
        />
      </View>
    </Wrapper>
  );
};
