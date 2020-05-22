import React, {useContext} from 'react';
import {VersionState} from './VersionState';
import ExpoConstants from 'expo-constants';

export interface VersionAPI {
  state: VersionState;
  startUpdate: () => Promise<void>;
}

export const initialVersionState: VersionState = {
  current: ExpoConstants.manifest?.version ?? '0.0.0',
  latest: '0.0.0',
  isUpdateAvailable: false,
  isUpdating: false,
};

export const VersionAPIContext = React.createContext<VersionAPI>({
  state: initialVersionState,
  startUpdate: async () => {
    return;
  },
});

export const useVersionAPI = () => {
  const context = useContext<VersionAPI>(VersionAPIContext);
  if (!context) {
    throw new Error('useVersionAPI must be used within a VersionAPIContext');
  }
  return context;
};
