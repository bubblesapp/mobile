import React from 'react';
import {Button, Footer, FooterTab, Icon, Text} from 'native-base';
import I18n from '../i18n';
//import {OfflineButton} from './common/OfflineButton';
import {useNav} from '../nav/useNav';
import {Routes} from '../nav/NavProvider';

export const TabBar: React.FC = (): JSX.Element => {
  //const {state, navigation} = props;
  const nav = useNav();
  return (
    <Footer>
      <FooterTab style={{justifyContent: 'center', alignItems: 'center'}}>
        <Button
          vertical
          //active={state.index === 0}
          onPress={() => nav.navigate(Routes.BubbleNavigator)}>
          <Icon type="FontAwesome5" name="users" />
          <Text>{I18n.t('bubble.title')}</Text>
        </Button>
        {/*<OfflineButton />*/}
        <Button
          testID={'profileTab'}
          accessibilityLabel={'Profile Tab'}
          vertical
          //active={state.index === 1}
          onPress={() => nav.navigate(Routes.ProfileNavigator)}>
          <Icon type="FontAwesome5" name="user-cog" />
          <Text>{I18n.t('profile.title')}</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};
