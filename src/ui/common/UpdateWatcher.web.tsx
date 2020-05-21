import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  Text,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {customTheme} from '../theme';
import I18n from '../../services/i18n';
import {useAPI} from '../../services/api/useAPI';
import {Config} from '@bubblesapp/api';
import {Icon} from 'react-native-elements';
import firebase from 'firebase/app';

export const UpdateWatcher: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const api = useAPI();
  const newWorker = useRef<ServiceWorker>();

  const makeSomeChange = false;

  useEffect(() => {
    const configSubscription = api.config
      .observe('web')
      .subscribe(async (config: Config) => {
        console.log('UpdateWatcher received config', config);
        if (Platform.OS === 'web') {
          try {
            const regs = await window.navigator.serviceWorker.getRegistrations();
            regs.map((reg) => {
              reg.onupdatefound = () => {
                if (reg.installing) {
                  newWorker.current = reg.installing;
                  let refreshingPage: boolean;
                  newWorker.current.onstatechange = () => {
                    console.log('onStateChange', newWorker.current?.state);
                    if (newWorker.current?.state === 'installed') {
                      if (navigator.serviceWorker.controller) {
                        console.log('New worker installed and ready', newWorker);
                        setIsVisible(true);
                      }
                    }
                    if (newWorker.current?.state === 'activated') {
                      if (navigator.serviceWorker.controller) {
                        if (refreshingPage) {
                          return;
                        }
                        console.log('New worker activated', newWorker);
                        window.location.reload();
                        refreshingPage = true;
                      }
                    }
                  };
                }
              };
              reg.update();
            });
          } catch (err) {
            console.log('Failed to get Service Worker registrations', err);
          }
        }
      });
    return () => configSubscription.unsubscribe();
  }, [api]);

  return isVisible ? (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => {
          setIsRefreshing(true);
          if (Platform.OS === 'web') {
            firebase
              .app()
              .delete()
              .then(() => {
                console.log('deleted firebase app');
                newWorker.current?.postMessage({action: 'skipWaiting'});
              })
              .catch((err) => {
                console.log('error deleting firebase app', err);
              });
          }
        }}>
        <Text style={styles.text}>{I18n.t('update.text')}</Text>
        {isRefreshing ? (
          <ActivityIndicator size={12} color={'#fff'} />
        ) : (
          <Icon
            name={'refresh'}
            type={'font-awesome'}
            size={12}
            color={'#fff'}
          />
        )}
      </TouchableOpacity>
    </View>
  ) : null;
};

type Styles = {
  container: ViewStyle;
  touchable: ViewStyle;
  text: TextStyle;
  cta: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    height: 32,
    backgroundColor: '#314DCB',
    position: 'relative',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
  },
  touchable: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontFamily: customTheme.fontFamily,
    marginHorizontal: 4,
  },
  cta: {
    color: '#fff',
    fontSize: 12,
    fontFamily: customTheme.boldFontFamily,
  },
});
