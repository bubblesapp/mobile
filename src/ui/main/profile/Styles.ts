import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {customTheme} from '../../theme';

type Styles = {
  wrapper: ViewStyle;
  header: ViewStyle;
  headerContent: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  content: ViewStyle;
  heading1: TextStyle;
  heading2: TextStyle;
  formContainer: ViewStyle;
  itemContainer: ViewStyle;
  itemTitleDark: TextStyle;
  itemTitleDanger: TextStyle;
  itemTitle: TextStyle;
  itemSubtitle: TextStyle;
  extraText: TextStyle;
};

export const profileStyles = StyleSheet.create<Styles>({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    maxHeight: 350,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    backgroundColor: customTheme.colors.lightBlue,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: customTheme.colors.gray,
    marginVertical: 16,
    fontFamily: customTheme.boldFontFamily,
  },
  subtitle: {
    fontSize: 18,
    color: customTheme.colors.gray,
    marginVertical: 16,
    fontFamily: customTheme.boldFontFamily,
  },
  content: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    //bottom: 0,
    //flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff', //customTheme.colors.lightBlue,
  },
  heading1: {
    color: customTheme.colors.darkBlue,
    textAlign: 'center',
    fontFamily: customTheme.boldFontFamily,
    fontSize: 20,
    marginVertical: 8,
  },
  heading2: {
    color: customTheme.colors.darkBlue,
    fontFamily: customTheme.fontFamily,
    fontSize: 16,
    textAlign: 'center',
  },
  formContainer: {
    margin: 32,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  itemContainer: {
    height: 72,
  },
  itemTitle: {
    color: customTheme.colors.mediumGray,
    fontFamily: customTheme.fontFamily,
  },
  itemTitleDark: {
    fontFamily: customTheme.fontFamily,
  },
  itemTitleDanger: {
    color: customTheme.colors.red,
    fontFamily: customTheme.fontFamily,
  },
  itemSubtitle: {
    fontFamily: customTheme.fontFamily,
  },
  extraText: {
    fontFamily: 'Nunito',
    fontWeight: 'normal',
    color: customTheme.colors.gray,
  },
});
