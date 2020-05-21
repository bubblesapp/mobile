import React from 'react';
import {Routes} from '../../../services/navigation/Routes';
import I18n from '../../../services/i18n';
import {useAuth} from '../../../services/auth/useAuth';
import {useNavigation} from '@react-navigation/native';
import {Notifications} from './Notifications';
import {Icon, ListItem} from 'react-native-elements';
import {ActivityIndicator, Image, Linking, Platform, Text, View,} from 'react-native';
import {useToast} from '../../common/Toast';
import {profileStyles as styles} from './Styles';
import {ItemIcon} from './ItemIcon';
import assets from '../../assets';
import Constants from '../../../services/util/Constants';
import {openURLInNewTab} from '../../../services/util/utils';
import {Template} from '../Template';
import {useProfile} from '../../../services/state/profile/useProfile';
import {useVersionAPI} from '../../../services/state/version/useVersionAPI';
import {customTheme} from '../../theme';

const chevronProps = {size: 24, marginEnd: 8};

export const Profile: React.FC = (): JSX.Element => {
  const nav = useNavigation();
  const auth = useAuth();
  const Toast = useToast();
  const profile = useProfile();
  const versionAPI = useVersionAPI();

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (e) {
      await Toast.danger(e.message);
    }
  };

  return (
    <Template>
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
        {versionAPI.state.current && (
          <ListItem
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
              `v${versionAPI.state.current}`,
            )}
            titleStyle={styles.itemTitleDark}
            subtitle={
              versionAPI.state.isUpdateAvailable
                ? I18n.t('profile.updateAvailable').replace(
                    '$0',
                    `v${versionAPI.state.latest}`,
                  )
                : I18n.t('profile.upToDate')
            }
            subtitleStyle={styles.itemSubtitle}
            rightElement={
              versionAPI.state.isUpdateAvailable ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: customTheme.colors.lightGray,
                    borderRadius: 15,
                    width: 50,
                    height: 30,
                    marginLeft: 16,
                  }}>
                  {versionAPI.state.isUpdating ? (
                    <ActivityIndicator
                      size={20}
                      color={customTheme.colors.ctaBackground}
                    />
                  ) : (
                    <Icon
                      name={'refresh'}
                      type={'font-awesome'}
                      size={20}
                      color={customTheme.colors.ctaBackground}
                      onPress={() => versionAPI.startUpdate()}
                    />
                  )}
                </View>
              ) : undefined
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
    </Template>
  );
};
