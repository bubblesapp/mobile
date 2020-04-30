import React, {useContext} from 'react';
import {Nav} from './Nav';

export const NavContext = React.createContext<Nav>(null);

export const useNav = () => {
  const context = useContext<Nav>(NavContext);
  if (!context) {
    throw new Error('useNav must be used within a NavProvider');
  }
  return context;
};
