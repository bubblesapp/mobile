import React, {useEffect, useState} from 'react';
import {Routes} from '../../nav/Routes';
import I18n from '../../i18n/';
import {useAuth} from '../../auth/Auth';
import {useAPI} from '../../api/useAPI';
import {Config, Profile as ProfileModel} from '@bubblesapp/api';
import {useNavigation} from '@react-navigation/native';
import {Notifications} from './Notifications';
import {Icon, ListItem} from 'react-native-elements';
import {Image, Linking, Platform, ScrollView, Text, View} from 'react-native';
import {useToast} from '../Toast';
import {profileStyles as styles} from './Styles';
import {ItemIcon} from './ItemIcon';
import {customTheme} from '../../theme/theme';
import {Wrapper} from '../common/Wrapper';
import assets from '../../assets';
import ExpoConstants from 'expo-constants';
import Constants from '../../Constants';
import compareVersions from 'compare-versions';
import {openURLInNewTab} from '../bubble/utils';
import {PlatformAwareWrapper} from '../common/PlatformAwareWrapper';
import {Helmet} from 'react-helmet';

const chevronProps = {size: 24, marginEnd: 8};

export const Profile: React.FC = (): JSX.Element => {
  const [profile, setProfile] = useState<ProfileModel>();
  const [webConfig, setWebConfig] = useState<Config>();
  const nav = useNavigation();
  const auth = useAuth();
  const api = useAPI();
  const Toast = useToast();

  useEffect(() => {
    const configSubscription = api.config
      .observe('web')
      .subscribe(setWebConfig);
    return () => configSubscription.unsubscribe();
  }, [api]);

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

  const currentVersion = ExpoConstants.manifest?.version;
  const latestVersion = webConfig?.latestVersion;
  let needsUpdate: boolean | undefined;
  if (currentVersion && latestVersion) {
    needsUpdate = compareVersions(latestVersion, currentVersion) > 0;
  }

  const update = () => {
    if (Platform.OS === 'web') {
      window.location.search = `?v=${latestVersion}`;
    }
  };

  return (
    <ScrollView
      scrollEnabled={true}
      disableScrollViewPanResponder={true}
      contentContainerStyle={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: customTheme.colors.lightBlue,
      }}>
      {Platform.OS === 'web' && (
        <Helmet>
          <style>{`html { overflow: hidden; position: fixed; } body { overflow: hidden; position: fixed; }`}</style>
        </Helmet>
      )}
      <View style={styles.header}>
        <View
          style={{
            flex: 2,
            maxHeight: 150,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Text style={styles.title}>{I18n.t('profile.title')}</Text>
        </View>
        <View
          style={{
            flex: 2,
            maxHeight: 150,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={assets.images.profile.avatar}
            resizeMode={'contain'}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 16,
              right: 0,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            maxHeight: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
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
          onPress={() => Linking.openURL('mailto:hello@bubblesapp.org')}
          leftIcon={<ItemIcon imageSource={assets.images.profile.chatBubble} />}
          buttonGroup={{
            containerStyle: {flex: 0.2},
            buttons: [
              {
                element: () => (
                  <Icon
                    color={'#1BA2FC'}
                    name={'facebook-messenger'}
                    type={'font-awesome-5'}
                    size={20}
                  />
                ),
              },
            ],
            onPress: () => openURLInNewTab(Constants.CHAT_LINK),
          }}
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
        {currentVersion && (
          <ListItem
            onPress={() =>
              Platform.OS === 'web' && document.location.reload(true)
            }
            containerStyle={styles.itemContainer}
            leftIcon={{
              type: 'font-awesome',
              name: 'refresh',
              size: 16,
              style: {
                marginRight: 20,
              },
            }}
            title={I18n.t('profile.version').replace(
              '$0',
              `v${currentVersion}`,
            )}
            titleStyle={styles.itemTitleDark}
            subtitle={
              typeof needsUpdate === 'undefined'
                ? undefined
                : needsUpdate
                ? I18n.t('profile.updateAvailable').replace(
                  '$0',
                  `v${latestVersion}`,
                )
                : I18n.t('profile.upToDate')
            }
            subtitleStyle={styles.itemSubtitle}
            buttonGroup={
              typeof needsUpdate === 'undefined'
                ? undefined
                : needsUpdate
                ? {
                  buttons: [I18n.t('profile.updateButton')],
                  onPress: () => update(),
                }
                : undefined
            }
            bottomDivider={true}
          />
        )}
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
      </View>
    </ScrollView>
  );
};

/*
<Text style={styles.title}>{I18n.t('profile.title')}</Text>
          <View style={styles.headerContent}>
            <Image
              source={assets.images.profile.avatar}
              style={styles.avatarImage}
            />
            <Text style={styles.subtitle}>{profile?.name}</Text>
          </View>
 */

/*
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
            onPress={() => Linking.openURL('mailto:hello@bubblesapp.org')}
            leftIcon={<ItemIcon imageSource={assets.images.profile.chatBubble} />}
            buttonGroup={{
              containerStyle: {flex: 0.2},
              buttons: [
                {
                  element: () => (
                    <Icon
                      color={'#1BA2FC'}
                      name={'facebook-messenger'}
                      type={'font-awesome-5'}
                      size={20}
                    />
                  ),
                },
              ],
              onPress: () => openURLInNewTab(Constants.CHAT_LINK),
            }}
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
          {currentVersion && (
            <ListItem
              onPress={() =>
                Platform.OS === 'web' && document.location.reload(true)
              }
              containerStyle={styles.itemContainer}
              leftIcon={{
                type: 'font-awesome',
                name: 'refresh',
                size: 16,
                style: {
                  marginRight: 20,
                },
              }}
              title={I18n.t('profile.version').replace(
                '$0',
                `v${currentVersion}`,
              )}
              titleStyle={styles.itemTitleDark}
              subtitle={
                typeof needsUpdate === 'undefined'
                  ? undefined
                  : needsUpdate
                  ? I18n.t('profile.updateAvailable').replace(
                      '$0',
                      `v${latestVersion}`,
                    )
                  : I18n.t('profile.upToDate')
              }
              subtitleStyle={styles.itemSubtitle}
              buttonGroup={
                typeof needsUpdate === 'undefined'
                  ? undefined
                  : needsUpdate
                  ? {
                      buttons: [I18n.t('profile.updateButton')],
                      onPress: () => update(),
                    }
                  : undefined
              }
              bottomDivider={true}
            />
          )}
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
 */
