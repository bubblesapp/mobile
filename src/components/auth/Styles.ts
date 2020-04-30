import {ImageStyle, StyleSheet, ViewStyle} from 'react-native';

interface Styles {
  contentContainer: ViewStyle;
  container: ViewStyle;
  background: ImageStyle;
  scrollViewContentContainer: ViewStyle;
  formWrapper: ViewStyle;
  formContainer: ViewStyle;
  inputContainer: ViewStyle;
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  inputContainer: {
    marginVertical: 8,
  },
});
