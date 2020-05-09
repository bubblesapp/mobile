import React, {useContext, useState} from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import I18n from '../i18n';
import {customTheme} from '../theme/theme';

interface ToastAPI {
  success: (message: string, duration?: number) => Promise<void>;
  danger: (message: string, duration?: number) => Promise<void>;
  warn: (message: string, duration?: number) => Promise<void>;
  info: (message: string, duration?: number) => Promise<void>;
}

export const ToastContext = React.createContext<ToastAPI>(null);

const SUCCESS_COLOR = customTheme.colors.success;
const DANGER_COLOR = '#d9534f';
const WARNING_COLOR = '#f0ad4e';
const INFO_COLOR = '#f4f4f4';

export const ToastProvider: React.FC = (props): JSX.Element => {
  const [toastBackgroundColor, setToastBackgroundColor] = useState('#ccc');
  const [toastMessage, setToastMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const show = async (
    message: string,
    backgroundColor: string,
    duration: number = 3000,
  ): Promise<void> =>
    new Promise((res) => {
      setToastMessage(message);
      setToastBackgroundColor(backgroundColor);
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        res();
      }, duration);
    });
  const toastAPI: ToastAPI = {
    success: (message) => show(message, SUCCESS_COLOR),
    danger: (message) => show(message, DANGER_COLOR),
    warn: (message) => show(message, WARNING_COLOR),
    info: (message) => show(message, INFO_COLOR),
  };
  return (
    <ToastContext.Provider value={toastAPI} {...props}>
      {visible ? (
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <View
              style={[
                styles.textContainer,
                {backgroundColor: toastBackgroundColor},
              ]}>
              <Text style={styles.text}>{toastMessage}</Text>
              <TouchableOpacity
                style={styles.closeButtonContainer}
                onPress={() => setVisible(false)}>
                <Text style={styles.closeButtonText}>{I18n.t('closeToast')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}
      {props.children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext<ToastAPI>(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within an ToastProvider');
  }
  return context;
};

type Styles = {
  wrapper: ViewStyle,
  container: ViewStyle;
  textContainer: ViewStyle;
  text: TextStyle;
  closeButtonContainer: ViewStyle;
  closeButtonText: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  wrapper: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 24,
    //height: 50,
    flex: 1,
    zIndex: 1000000,
    opacity: 0.98,
    width: '100%',
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 4,
  },
  text: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButtonContainer: {
    borderLeftWidth: 1,
    borderLeftColor: '#fff',
    marginVertical: 8,
    marginLeft: 8,
    paddingHorizontal: 16,
  },
  closeButtonText: {
    color: '#fff',
  },
});
