import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {customTheme} from '../../theme/theme';

type Styles = {
  wrapper: ViewStyle;
  header: ViewStyle;
  headerContent: ViewStyle;
  avatarImage: ImageStyle;
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
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 35,
    backgroundColor: customTheme.colors.lightBlue,
  },
  headerContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 100,
    height: 100,
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
    flex: 1,
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
