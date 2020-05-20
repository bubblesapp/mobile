import React, {useContext} from 'react';
import {AuthAPI} from './AuthAPI';

export const AuthContext = React.createContext<AuthAPI>(null);

export const useAuth = () => {
  const context = useContext<AuthAPI>(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
