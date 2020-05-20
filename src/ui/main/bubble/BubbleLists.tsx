import React, {useEffect} from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import {customTheme} from '../../theme';
import {PeopleList} from './PeopleList';
import {AlertList} from './AlertList';
import I18n from '../../../services/i18n';
import {Alert, Friend, Invite} from '@bubblesapp/api';
import _ from 'lodash';
import {BubbleStackParamsList} from './BubbleNavigator';
import {Routes} from '../../../services/navigation/Routes';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

type Props = {
  friends: Friend[];
  outgoingInvites: Invite[];
  incomingInvites: Invite[];
  alerts: Alert[];
};

type BubbleRouteProp = RouteProp<BubbleStackParamsList, Routes.Bubble>;

export const BubbleLists: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  const route = useRoute<BubbleRouteProp>();
  const selectedButton: number = route.params?.tab === 'alerts' ? 1 : 0;

  useEffect(() => {
    if (props.alerts.length > 0) {
      navigation.navigate(Routes.Bubble, {tab: 'alerts'});
    }
  }, [navigation, props.alerts]);
  return (
    <View style={styles.lists}>
      <View style={styles.listHeader}>
        <ButtonGroup
          buttons={[
            I18n.t('bubble.friends.title'),
            `${I18n.t('bubble.alerts.title')} (${props.alerts.length})`,
          ]}
          selectedIndex={selectedButton}
          onPress={(i) =>
            navigation.navigate(Routes.Bubble, {
              tab: i === 1 ? 'alerts' : 'people',
            })
          }
          containerStyle={styles.buttonsContainer}
          buttonStyle={styles.buttons}
          textStyle={styles.buttonsText}
          selectedButtonStyle={styles.selectedButton}
          selectedTextStyle={styles.selectedButtonText}
          innerBorderStyle={{width: 0}}
        />
      </View>
      <View
        style={{
          display: selectedButton === 0 ? 'flex' : 'none',
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <PeopleList
          friends={props.friends}
          outgoingInvites={props.outgoingInvites}
          incomingInvites={props.incomingInvites}
        />
      </View>
      <View
        style={{
          display: selectedButton === 1 ? 'flex' : 'none',
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <AlertList alerts={_.orderBy(props.alerts, 'createdAt', 'desc')} />
      </View>
    </View>
  );
};

type Styles = {
  lists: ViewStyle;
  listHeader: ViewStyle;
  handleContainer: ViewStyle;
  handle: ViewStyle;
  buttonsContainer: ViewStyle;
  buttons: ViewStyle;
  buttonsText: TextStyle;
  selectedButton: ViewStyle;
  selectedButtonText: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  lists: {
    position: 'absolute',
    top: '65%',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  listHeader: {
    height: 72,
    backgroundColor: '#fff',
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    shadowRadius: 45,
    shadowColor: customTheme.colors.shadow,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  /*listHeaderContent: {
    marginHorizontal: 16,
  },*/
  handleContainer: {
    paddingVertical: 8,
    height: 20,
    //backgroundColor: '#f00',
    marginBottom: 16,
  },
  handle: {
    width: 100,
    height: 5,
    backgroundColor: customTheme.colors.lightGray,
    borderRadius: 2,
    alignSelf: 'center',
  },
  buttonsContainer: {
    alignSelf: 'center',
    backgroundColor: customTheme.colors.lightGray,
    borderRadius: 5,
    padding: 2,
    width: '75%',
    maxWidth: 300,
    borderWidth: 0,
    height: 32,
  },
  buttons: {
    backgroundColor: customTheme.colors.lightGray,
    borderRadius: 5,
    paddingHorizontal: 16,
  },
  buttonsText: {
    color: customTheme.colors.ctaBackground,
    fontFamily: customTheme.fontFamily,
    fontSize: 14,
  },
  selectedButton: {
    backgroundColor: '#fff',
  },
  selectedButtonText: {
    color: customTheme.colors.ctaBackground,
    fontFamily: customTheme.boldFontFamily,
  },
});
