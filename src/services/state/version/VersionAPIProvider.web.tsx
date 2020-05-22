import React, {useEffect, useReducer, useRef} from 'react';
import {versionReducer, VersionReducer} from './reducer';
import {useAPI} from '../../api/useAPI';
import {IsUpdatingChangedAction, LatestVersionChangedAction} from './actions';
import {Config} from '@bubblesapp/api';
import {Platform} from 'react-native';
import firebase from 'firebase';
import {
  initialVersionState,
  VersionAPI,
  VersionAPIContext,
} from './useVersionAPI';

export const VersionAPIProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer<VersionReducer>(
    versionReducer,
    initialVersionState,
  );
  const newWorker = useRef<ServiceWorker>();
  const api = useAPI();

  useEffect(() => {
    const configSubscription = api.config
      .observe('web')
      .subscribe(async (config: Config) => {
        console.log('VersionStateProvider received config', config);
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
                        console.log(
                          'New worker installed and ready',
                          newWorker,
                        );
                        if (config.latestVersion) {
                          dispatch(
                            new LatestVersionChangedAction(
                              config.latestVersion as string,
                            ),
                          );
                        }
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

  const versionAPI: VersionAPI = {
    state,
    startUpdate: async () => {
      if (Platform.OS === 'web') {
        try {
          dispatch(new IsUpdatingChangedAction(true));
          await firebase.app().delete();
          console.log('deleted firebase app');
          newWorker.current?.postMessage({action: 'skipWaiting'});
        } catch (err) {
          console.log('error deleting firebase app', err);
          dispatch(new IsUpdatingChangedAction(false));
        }
      }
    },
  };

  return <VersionAPIContext.Provider value={versionAPI} {...props} />;
};
