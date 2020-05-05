import React from 'react';
import URL from 'url';
import QueryString from 'query-string';
import {DynamicLinkQueryString} from './DynamicLinkQueryString';
import {VerifyEmail} from '../components/auth/VerifyEmail';
import {ResetPassword} from '../components/auth/ResetPassword';
import {RecoverEmail} from '../components/auth/RecoverEmail';

export const DynamicLinkHandler: React.FC = (): JSX.Element | null => {
  const url = URL.parse(window.location.href);
  if (url.search) {
    const queryString = QueryString.parse(url.search) as DynamicLinkQueryString;
    console.log('queryString', queryString);
    switch (queryString.mode) {
      case 'verifyEmail':
        return <VerifyEmail oobCode={queryString.oobCode} />;
      case 'recoverEmail':
        return <RecoverEmail oobCode={queryString.oobCode} />;
      case 'resetPassword':
        return <ResetPassword oobCode={queryString.oobCode} />;
    }
  }
  return null;
};
