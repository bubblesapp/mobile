import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {customTheme} from '../../theme/theme';

type Styles = {
  overlay: ViewStyle;
  popupTitle: TextStyle;
  popupWrapper: ViewStyle;
  popupHeader: ViewStyle;
  popupContent: ViewStyle;
};

export const commonStyles = StyleSheet.create<Styles>({
  overlay: {
    width: '80%',
    height: '80%',
    maxWidth: 326,
    maxHeight: 570,
  },
  popupWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    padding: 32,
  },
  popupTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: customTheme.colors.darkBlue,
    fontFamily: 'Nunito-Bold',
  },
  popupHeader: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  popupContent: {

  },
});
