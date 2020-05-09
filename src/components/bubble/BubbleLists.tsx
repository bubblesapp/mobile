import React, {useRef, useState} from 'react';
import {StyleSheet, TextStyle, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle,} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import {customTheme} from '../../theme/theme';
import {FriendList} from './FriendList';
import {AlertList} from './AlertList';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {useSafeArea} from 'react-native-safe-area-context';
import I18n from '../../i18n';
import Dimensions from '../common/Dimensions';

export const BubbleLists: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState(0);
  const [languetteOpen, setLanguetteOpen] = useState(false);
  const languette = useRef<Modalize | null>();
  const insets = useSafeArea();
  return (
    <View style={styles.lists}>
      <View style={styles.listHeader}>
        <View style={styles.listHeaderContent}>
          <View
            style={styles.handleContainer}
            /*onPress={() =>
              languetteOpen
                ? languette.current?.close('alwaysOpen')
                : languette.current?.open('top')
            }*/
          >
            <View style={styles.handle} />
          </View>
          <ButtonGroup
            buttons={[
              I18n.t('bubble.friends.title'),
              I18n.t('bubble.alerts.title'),
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
      {selectedButton === 0 ? <FriendList /> : <AlertList />}
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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    shadowRadius: 45,
    shadowColor: customTheme.colors.shadow,
  },
  listHeader: {
    backgroundColor: '#fff',
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    shadowRadius: 45,
    shadowColor: customTheme.colors.shadow,
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
    width: '65%',
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
