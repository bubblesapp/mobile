import React, {useState} from 'react';
import {StyleSheet, TextStyle, View, ViewStyle, Text} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import {customTheme} from '../../theme/theme';
import {FriendList} from './FriendList';
import {AlertList} from './AlertList';

export const BubbleLists: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState(0);
  return (
    <View style={styles.lists}>
      <View style={styles.handle} />
      <ButtonGroup
        buttons={['People', 'Alerts']}
        selectedIndex={selectedButton}
        onPress={(i) => setSelectedButton(i)}
        containerStyle={styles.buttonsContainer}
        buttonStyle={styles.buttons}
        textStyle={styles.buttonsText}
        selectedButtonStyle={styles.selectedButton}
        selectedTextStyle={styles.selectedButtonText}
        innerBorderStyle={{width: 0}}
      />
      {selectedButton === 0 ? <FriendList /> : <AlertList />}
    </View>
  );
};

type Styles = {
  lists: ViewStyle;
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
    backgroundColor: '#fff',
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    shadowRadius: 45,
    shadowColor: customTheme.colors.shadow,
  },
  handle: {
    width: 100,
    height: 5,
    backgroundColor: customTheme.colors.lightGray,
    borderRadius: 2,
    marginVertical: 10,
    alignSelf: 'center',
  },
  buttonsContainer: {
    alignSelf: 'center',
    marginTop: 24,
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
