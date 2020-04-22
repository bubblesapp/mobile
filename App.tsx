import React from 'react';
import {Root} from './src/components/Root';
import {APIProvider} from './src/api/useAPI';
import {AuthProvider} from './src/auth/Auth';

console.disableYellowBox = true;

export type AppProps = {
  isHeadless: boolean;
};

const App: React.FC<AppProps> = ({isHeadless}) => {
  if (isHeadless) {
    return null;
  }
  return (
    <APIProvider>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </APIProvider>
  );
};

export default App;
