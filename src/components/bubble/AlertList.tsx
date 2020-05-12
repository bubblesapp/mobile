import {Alert} from '@bubblesapp/api';
import React, {useState} from 'react';
import {useAPI} from '../../api/useAPI';
import I18n from '../../i18n';
import {View} from 'react-native';
import {useToast} from '../Toast';
import {AlertListEmpty} from './AlertListEmpty';
import {SwipeListView} from 'react-native-swipe-list-view';
import {DestructiveButton} from './DestructiveButton';
import {AlertItem} from './AlertItem';
import {AlertsHeader} from './AlertsHeader';
import {AlertDetailsModal} from './AlertDetailsModal';
import {Analytics, Events} from '../../analytics/Analytics';

type Props = {
  alerts: Alert[];
};

export const AlertList: React.FC<Props> = ({alerts}) => {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [alertDetailsVisible, setAlertDetailsVisible] = useState(false);

  const api = useAPI();
  const Toast = useToast();

  const deleteAlert = async (alert: Alert) => {
    try {
      await api.alerts.delete(alert.id);
      Analytics.logEvent(Events.DeleteAlert);
      Toast.success(I18n.t('bubble.alerts.deleteSuccess'));
    } catch (err) {
      Toast.danger(err.message);
    } finally {
      setAlertDetailsVisible(false);
    }
  };

  return (
    <View style={{backgroundColor: '#fff'}}>
      {alerts.length > 0 ? (
        <>
          <AlertDetailsModal
            onCancel={() => setAlertDetailsVisible(false)}
            onDelete={(alert: Alert) => deleteAlert(alert)}
            alert={selectedAlert || alerts[0]}
            visible={alertDetailsVisible}
          />
          <SwipeListView<Alert>
            data={alerts}
            contentContainerStyle={{backgroundColor: '#fff'}}
            scrollEnabled={true}
            ListFooterComponent={AlertsHeader}
            renderItem={({item}) => (
              <AlertItem
                alert={item}
                onPress={() => {
                  setSelectedAlert(item);
                  setAlertDetailsVisible(true);
                }}
              />
            )}
            keyExtractor={(item) => item.createdAt.toString()}
            renderHiddenItem={({item}) => {
              return (
                <DestructiveButton
                  title={I18n.t('bubble.alerts.deleteButton')}
                  onPress={() => deleteAlert(item)}
                />
              );
            }}
            disableRightSwipe={true}
            rightOpenValue={-85}
          />
        </>
      ) : (
        <AlertListEmpty />
      )}
    </View>
  );
};
