import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextStyle, View, ViewStyle,} from 'react-native';
import assets from '../../assets';
import {customTheme} from '../../theme';
import {SubmitButton} from '../../common/SubmitButton';
import {CloseButton} from '../../common/CloseButton';
import I18n from '../../../services/i18n';
import {Alert} from '@bubblesapp/api';
import moment from 'moment';
import {daysAgo} from '../../../services/util/utils';
import {Analytics, Events} from '../../../services/analytics/Analytics';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useToast} from '../../common/Toast';
import {useAPI} from '../../../services/api/useAPI';
import {BubbleStackParamsList} from './BubbleNavigator';
import {Routes} from '../../../services/navigation/Routes';

type Props = {
  onDelete?: (alert: Alert) => void;
  onCancel?: () => void;
  visible: boolean;
};

type AlertDetailsRouteProp = RouteProp<
  BubbleStackParamsList,
  Routes.AlertDetails
>;

export const AlertDetailsModal: React.FC<Props> = (props) => {
  const [isDeletingAlert, setIsDeletingAlert] = useState(false);
  const Toast = useToast();
  const api = useAPI();
  const nav = useNavigation();
  const {params} = useRoute<AlertDetailsRouteProp>();

  if (!params.id) {
    console.log('Cannot show an alert without an id');
    return null;
  }

  const close = () => {
    nav.navigate(Routes.BubbleNavigator, {
      screen: Routes.Bubble,
    });
  };

  const deleteAlert = async () => {
    try {
      setIsDeletingAlert(true);
      await api.alerts.delete(params.id);
      Analytics.logEvent(Events.DeleteAlert);
      Toast.success(I18n.t('bubble.alerts.deleteSuccess'));
      setIsDeletingAlert(false);
      close();
    } catch (err) {
      Toast.danger(err.message);
      setIsDeletingAlert(false);
    }
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.closeButton}>
          <CloseButton onPress={() => close()} />
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
            .replace('$0', daysAgo(params.alert.createdAt))
            .replace(
              '$1',
              moment(params.alert.createdAt).format(
                I18n.t('bubble.alerts.detailsDateFormat'),
              ),
            )}
        </Text>
        <Text style={styles.text}>
          {params.alert.message}
        </Text>
        <View style={styles.buttonsContainer}>
          <SubmitButton
            onPress={() => nav.goBack()}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            title={I18n.t('bubble.alerts.detailsCloseButton')}
          />
          <View style={{width: 24}} />
          <SubmitButton
            onPress={() => deleteAlert()}
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
