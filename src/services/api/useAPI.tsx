import React, {useContext} from 'react';
import {API} from '@bubblesapp/api';

export const APIContext = React.createContext<API>(null);

export const useAPI = () => {
  const context = useContext<API>(APIContext);
  if (!context) {
    throw new Error('useAPI must be used within an APIProvider');
  }
  return context;
};
