import React, {useContext} from 'react';
import {DeviceType} from 'expo-device';

export type CurrentDevice = {
  type: DeviceType;
};

export const DeviceContext = React.createContext<CurrentDevice | undefined>(undefined);

export const useDevice = () => {
  const context = useContext<CurrentDevice | undefined>(DeviceContext);
  if (!context) {
    //throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
};
