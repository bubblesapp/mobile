import React, {useEffect} from 'react';
import dynamicLinks, {
  FirebaseDynamicLinksTypes,
} from '@react-native-firebase/dynamic-links';
import URL, {UrlWithStringQuery} from 'url';
import QueryString from 'query-string';
import {useAuth} from '../auth/Auth';
import {useToast} from '../components/Toast';

type DynamicLinkQueryString = {
  mode: 'verifyEmail' | 'recoverEmail' | 'resetPassword';
  oobCode: string;
  apiKey: string;
  continueUrl: string;
  lang: string;
};

export const DynamicLinkHandler: React.FC = (): null => {
  const auth = useAuth();
  const Toast = useToast();

  const handleDynamicLink = (link: FirebaseDynamicLinksTypes.DynamicLink) => {
    const url: UrlWithStringQuery = URL.parse(link.url);
    if (url.search) {
      const queryString = QueryString.parse(
        url.search,
      ) as DynamicLinkQueryString;
      console.log()
      switch (queryString.mode) {
        case 'verifyEmail':
          if (auth.state?.emailVerified) {
            return;
          }
          // Verify code and refresh auth state
          auth.verifyEmail(queryString.oobCode).catch((err) => {
            console.log(err);
            Toast.danger(err.message);
          });
          break;
        case 'recoverEmail':
          break;
        case 'resetPassword':
          break;
      }
    }
  };

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then((link: FirebaseDynamicLinksTypes.DynamicLink | null) => {
        console.log('Dynamic link background', link);
        if (link) {
          handleDynamicLink(link);
        }
      });
  }, []);

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(
      (link: FirebaseDynamicLinksTypes.DynamicLink) => {
        console.log('Dynamic link foreground', link);
        handleDynamicLink(link);
      },
    );
    return () => unsubscribe();
  }, []);

  return null;
};
