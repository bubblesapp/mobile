import React, {useState} from 'react';
import {Image, Modal as ModalNative, Platform, StyleSheet, Text, TextStyle, View, ViewStyle,} from 'react-native';
import assets from '../../assets';
import {customTheme} from '../../theme/theme';
import ModalWeb from 'modal-react-native-web';
import {Overlay} from 'react-native-elements';
import {SubmitButton} from '../common/SubmitButton';
import {CloseButton} from '../common/CloseButton';
import I18n from '../../i18n';
import {Alert} from '@bubblesapp/api';
import moment from 'moment';
import {daysAgo, daysAgoString} from './utils';
import {commonStyles} from '../common/Styles';

const Modal = Platform.OS === 'web' ? ModalWeb : ModalNative;

type Props = {
  onDelete?: (alert: Alert) => void;
  onCancel?: () => void;
  alert: Alert;
  visible: boolean;
};

export const AlertDetailsModal: React.FC<Props> = (props) => {
  const [isDeletingAlert, setIsDeletingAlert] = useState(false);

  return (
    <Overlay
      ModalComponent={Modal}
      transparent={true}
      isVisible={props.visible}
      overlayStyle={[commonStyles.overlay, styles.overlay]}
      onBackdropPress={() => props.onCancel && props.onCancel()}
      animationType={'fade'}>
      <>
        <View style={styles.header}>
          <View style={styles.closeButton}>
            <CloseButton onPress={props.onCancel} />
          </View>
          <Image
            source={assets.images.bubble.alert}
            style={{width: 90, height: 90}}
          />
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>
              {I18n.t('bubble.alerts.detailsTitle')}
            </Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.heading1}>
            {I18n.t('bubble.alerts.detailsDate')
              .replace('$0', daysAgo(props.alert.createdAt))
              .replace(
                '$1',
                moment(props.alert.createdAt).format(
                  I18n.t('bubble.alerts.detailsDateFormat'),
                ),
              )}
          </Text>
          <Text style={styles.text}>
            {props.alert.message}
          </Text>
          <View style={styles.buttonsContainer}>
            <SubmitButton
              onPress={() => props.onCancel && props.onCancel()}
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.button}
              title={I18n.t('bubble.alerts.detailsCloseButton')}
            />
            <View style={{width: 24}} />
            <SubmitButton
              onPress={() => {
                setIsDeletingAlert(true);
                props.onDelete && props.onDelete(props.alert);
                setIsDeletingAlert(false);
              }}
              containerStyle={styles.buttonContainer}
              buttonStyle={[
                styles.button,
                {backgroundColor: customTheme.colors.red},
              ]}
              loading={isDeletingAlert}
              title={I18n.t('bubble.alerts.detailsDeleteButton')}
            />
          </View>
        </View>
      </>
    </Overlay>
  );
};

type Styles = {
  overlay: ViewStyle;
  closeButton: ViewStyle;
  header: ViewStyle;
  headerTitleContainer: ViewStyle;
  headerTitle: ViewStyle;
  content: ViewStyle;
  heading1: TextStyle;
  text: TextStyle;
  buttonsContainer: ViewStyle;
  buttonContainer: ViewStyle;
  button: ViewStyle;
  buttonShadow: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  overlay: {
    width: '80%',
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
    backgroundColor: customTheme.colors.red,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    padding: 32,
  },
  headerTitleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontFamily: customTheme.boldFontFamily,
    fontSize: 20,
  },
  content: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    padding: 16,
  },
  heading1: {
    fontFamily: customTheme.boldFontFamily,
    fontSize: 14,
    color: customTheme.colors.mediumGray,
  },
  text: {
    fontFamily: customTheme.fontFamily,
    fontSize: 14,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginHorizontal: 16,
    marginTop: 24,
  },
  buttonContainer: {
    backgroundColor: 'rgba(0, 255, 0, 0)',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  button: {},
  buttonShadow: {
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
    shadowColor: '#000',
  },
});
