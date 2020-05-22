import React from 'react';
import URL from 'url';
import QueryString from 'query-string';
import {DynamicLinkQueryString} from './DynamicLinkQueryString';
import {ResetPassword} from '../../ui/auth/ResetPassword';
import {RecoverEmail} from '../../ui/auth/RecoverEmail';
import {SendOutgoingInviteModal} from '../../ui/main/bubble/SendOutgoingInviteModal';

export const DynamicLinkHandler: React.FC = (): JSX.Element | null => {
  const url = URL.parse(window.location.href);
  if (url.search) {
    const queryString = QueryString.parse(url.search) as DynamicLinkQueryString;
    console.log('queryString', queryString);
    switch (queryString.mode) {
      case 'verifyEmail':
        break;
      case 'recoverEmail':
        if (queryString.oobCode) {
          return <RecoverEmail oobCode={queryString.oobCode} />;
        }
        break;
      case 'resetPassword':
        if (queryString.oobCode) {
          return <ResetPassword oobCode={queryString.oobCode} />;
        }
        break;
      case 'invite':
        if (queryString.e && queryString.n) {
          return (
            <SendOutgoingInviteModal
              toEmail={queryString.e}
              toName={queryString.n}
            />
          );
        }
        break;
    }
  }
  return null;
};
