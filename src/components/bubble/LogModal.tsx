import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  ViewStyle,
  Text,
  TextStyle,
  Platform,
  Modal as ModalNative,
} from 'react-native';
import assets from '../../assets';
import {customTheme} from '../../theme/theme';
import ModalWeb from 'modal-react-native-web';
import {Overlay} from 'react-native-elements';
import {DayPicker} from './DayPicker';
import {SubmitButton} from '../common/SubmitButton';
import {CloseButton} from '../common/CloseButton';

const Modal = Platform.OS === 'web' ? ModalWeb : ModalNative;

type Props = {
  onCancel: () => void;
  onDatePicked: (date: Date) => void;
  visible: boolean;
};

export const LogModal: React.FC<Props> = (props) => {
  const [date, setDate] = useState(new Date());
  return (
    <Overlay
      ModalComponent={Modal}
      transparent={true}
      isVisible={props.visible}
      overlayStyle={styles.overlay}
      onBackdropPress={() => props.onCancel()}
      animationType={'fade'}>
      <>
        <View style={styles.header}>
          <View style={styles.closeButton}>
            <CloseButton onPress={props.onCancel} />
          </View>
          <Image
            source={assets.images.bubble.notepadBig}
            style={{width: 64, height: 64}}
          />
          <Text style={styles.headerTitle}>{'Save a close contact'}</Text>
          <Text style={styles.headerName}>{'Edouard'}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.heading1}>{'When did you last meet?'}</Text>
          <Text style={styles.heading2}>
            {'It will help you warn the right people in case of risk'}
          </Text>
          <DayPicker onChange={(d) => setDate(d)} />
          <SubmitButton
            containerStyle={styles.buttonContainer}
            title={'Save'}
            onPress={() => props.onDatePicked(date)}
          />
        </View>
      </>
    </Overlay>
  );
};

type Styles = {
  overlay: ViewStyle;
  closeButton: ViewStyle;
  header: ViewStyle;
  headerTitle: ViewStyle;
  headerName: ViewStyle;
  content: ViewStyle;
  heading1: TextStyle;
  heading2: TextStyle;
  buttonContainer: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  overlay: {
    width: '80%',
    height: '80%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 0,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  closeButton: {
    position: 'absolute',
    top: 18,
    right: 18,
  },
  header: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: customTheme.colors.ctaBackground,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    padding: 32,
  },
  headerTitle: {
    color: '#fff',
    fontFamily: customTheme.boldFontFamily,
    fontSize: 20,
  },
  headerName: {
    color: '#fff',
    fontFamily: customTheme.boldFontFamily,
    fontSize: 24,
  },
  content: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    padding: 32,
  },
  heading1: {
    fontFamily: customTheme.boldFontFamily,
    fontSize: 16,
    marginBottom: 24,
  },
  heading2: {
    fontFamily: customTheme.fontFamily,
    fontSize: 14,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 32,
  },
});
