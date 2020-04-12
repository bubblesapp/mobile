import React, {useContext} from 'react';
import {API} from './API';
import {FirebaseAPI} from '../firebase-api/FirebaseAPI';

const api = new FirebaseAPI();
export const APIContext = React.createContext<API>(api);

export const APIProvider: React.FC = (props): JSX.Element => {
  return <APIContext.Provider value={api} {...props} />;
};

export const useAPI = () => {
  const context = useContext<API>(APIContext);
  if (!context) {
    throw new Error('useAPI must be used within an APIProvider');
  }
  return context;
};
