import React from 'react';
import {APIContext} from '../useAPI';
import {api} from './FirebaseAPI';

export const FirebaseAPIProvider: React.FC = (props): JSX.Element => {
  return <APIContext.Provider value={api} {...props} />;
};
