import React from 'react';
import I18n from '../../../services/i18n';
import {Linking, View} from 'react-native';
import {Wrapper} from '../../common/Wrapper';
import {profileStyles as styles} from './Styles';
import {Header} from './Header';
import {customTheme} from '../../theme';
import {ItemIcon} from './ItemIcon';
import Paper from '../../../../assets/images/profile/Paper.png';
import {ListItem} from 'react-native-elements';
import Constants from '../../../services/util/Constants';

const rightIconProps = {
  type: 'font-awesome',
  name: 'external-link',
  size: 20,
  style: {
    marginEnd: 8,
    marginTop: 8,
  },
  color: customTheme.colors.mediumGray,
};

export const LegalInformation: React.FC = (): JSX.Element => {
  return (
    <Wrapper topColor={customTheme.colors.lightBlue} bottomColor={'#fff'}>
      <View style={styles.header}>
        <Header title={I18n.t('profile.legalInfo.title')} />
      </View>
      <View style={[styles.content, {justifyContent: 'flex-start'}]}>
        <ListItem
          containerStyle={styles.itemContainer}
          onPress={() => Linking.openURL(Constants.TERMS_LINK)}
          leftIcon={<ItemIcon imageSource={Paper} />}
          title={I18n.t('profile.legalInfo.terms')}
          titleStyle={styles.itemTitleDark}
          rightIcon={rightIconProps}
          bottomDivider={true}
        />
        <ListItem
          containerStyle={styles.itemContainer}
          onPress={() => Linking.openURL(Constants.PRIVACY_LINK)}
          leftIcon={<ItemIcon imageSource={Paper} />}
          title={I18n.t('profile.legalInfo.privacy')}
          titleStyle={styles.itemTitleDark}
          rightIcon={rightIconProps}
          bottomDivider={true}
        />
        <ListItem
          containerStyle={styles.itemContainer}
          onPress={() => Linking.openURL(Constants.LEGAL_NOTICE_LINK)}
          leftIcon={<ItemIcon imageSource={Paper} />}
          title={I18n.t('profile.legalInfo.legalNotice')}
          titleStyle={styles.itemTitleDark}
          rightIcon={rightIconProps}
        />
      </View>
    </Wrapper>
  );
};
