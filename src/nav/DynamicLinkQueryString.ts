export type DynamicLinkQueryString = {
  mode: 'verifyEmail' | 'recoverEmail' | 'resetPassword';
  oobCode: string;
  apiKey: string;
  continueUrl: string;
  lang: string;
};
