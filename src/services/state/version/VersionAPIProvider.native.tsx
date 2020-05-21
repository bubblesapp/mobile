import React, {useReducer} from 'react';
import {initialVersionState, VersionAPI, VersionAPIContext} from './useVersionAPI';
import {versionReducer, VersionReducer} from './reducer';

export const VersionAPIProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer<VersionReducer>(
    versionReducer,
    initialVersionState,
  );
  const versionAPI: VersionAPI = {
    state,
    startUpdate: async () => {
      return;
    },
  };
  return <VersionAPIContext.Provider value={versionAPI} {...props} />;
};
