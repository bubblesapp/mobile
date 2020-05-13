import React, {useState} from 'react';
import {StyleSheet, TextStyle, View, ViewStyle,} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import {customTheme} from '../../theme/theme';
import {PeopleList} from './PeopleList';
import {AlertList} from './AlertList';
import I18n from '../../i18n';
import {Alert, Friend, Invite} from '@bubblesapp/api';

type Props = {
  friends: Friend[];
  outgoingInvites: Invite[];
  incomingInvites: Invite[];
  alerts: Alert[];
};

export const BubbleLists: React.FC<Props> = (props) => {
  const [selectedButton, setSelectedButton] = useState(0);
  return (
    <View style={styles.lists}>
      <View style={styles.listHeader}>
        <View style={styles.listHeaderContent}>
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>
          <ButtonGroup
            buttons={[
              I18n.t('bubble.friends.title'),
              `${I18n.t('bubble.alerts.title')} (${props.alerts.length})`,
            ]}
            selectedIndex={selectedButton}
            onPress={(i) => setSelectedButton(i)}
            containerStyle={styles.buttonsContainer}
            buttonStyle={styles.buttons}
            textStyle={styles.buttonsText}
            selectedButtonStyle={styles.selectedButton}
            selectedTextStyle={styles.selectedButtonText}
            innerBorderStyle={{width: 0}}
          />
        </View>
      </View>
      <View style={{display: selectedButton === 0 ? 'flex' : 'none'}}>
        <PeopleList
          friends={props.friends}
          outgoingInvites={props.outgoingInvites}
          incomingInvites={props.incomingInvites}
        />
      </View>
      <View style={{display: selectedButton === 1 ? 'flex' : 'none'}}>
        <AlertList alerts={props.alerts} />
      </View>
    </View>
  );
};

/*
<Portal>
<Modalize
ref={languette}
withHandle={false}
onOpened={() => setLanguetteOpen(true)}
onClosed={() => setLanguetteOpen(false)}
alwaysOpen={Dimensions.LANGUETTE_ALWAYS_OPEN}
modalStyle={{backgroundColor: 'rgba(0,0,0,0)'}}
modalTopOffset={50 + insets.top}
withOverlay={false}
childrenStyle={{backgroundColor: '#fff'}}
closeOnOverlayTap={false}
panGestureEnabled={false}
HeaderComponent={
  </Modalize>
    </Portal> */

type Styles = {
  lists: ViewStyle;
  listHeader: ViewStyle;
  listHeaderContent: ViewStyle;
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    shadowRadius: 45,
    shadowColor: customTheme.colors.shadow,
    backgroundColor: '#ff0',
  },
  listHeader: {
    backgroundColor: '#fff',
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
  },
  listHeaderContent: {
    marginTop: 16,
    marginHorizontal: 16,
    paddingBottom: 16,
  },
  handleContainer: {
    paddingVertical: 8,
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
    marginTop: 16,
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
