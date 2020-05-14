import {ImageStyle, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {customTheme} from '../../theme/theme';

interface Styles {
  contentContainer: ViewStyle;
  container: ViewStyle;
  background: ImageStyle;
  scrollViewContentContainer: ViewStyle;
  formWrapper: ViewStyle;
  formContainer: ViewStyle;
  columnText: ViewStyle;
  heading1: TextStyle;
  heading2: TextStyle;
  rememberContainer: ViewStyle;
  noAccountContainer: ViewStyle;
  checkboxLabel: TextStyle;
  checkboxLabelLink: TextStyle;
  checkboxContainer: ViewStyle;
  extraText: TextStyle;
  extraLink: TextStyle;
  overlay: ViewStyle;
}

export const authStyleSheet = StyleSheet.create<Styles>({
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    flexGrow: 1,
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    flexGrow: 1,
    width: '100%',
    maxWidth: 400,
  },
  formWrapper: {
    paddingVertical: 36,
  },
  formContainer: {
    margin: 32,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  columnText: {
    marginTop: 40,
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
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
  rememberContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: 8,
  },
  noAccountContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderWidth: 0,
    padding: 0,
  },
  checkboxLabel: {
    paddingTop: 2,
    fontFamily: 'Nunito',
    fontWeight: 'normal',
    color: customTheme.colors.gray,
  },
  checkboxLabelLink: {
    paddingTop: 2,
    fontFamily: 'Nunito',
    fontWeight: 'normal',
    color: customTheme.colors.ctaBackground,
  },
  extraText: {
    fontFamily: 'Nunito',
    fontWeight: 'normal',
    color: customTheme.colors.gray,
  },
  extraLink: {
    fontFamily: 'Nunito-Bold',
    color: customTheme.colors.ctaBackground,
  },
  overlay: {
    borderRadius: 10,
    //borderWidth: 5,
    //borderColor: customTheme.colors.darkBlue,
    backgroundColor: '#fff',
  },
});
