export type DynamicLinkQueryString = {
  mode: 'verifyEmail' | 'recoverEmail' | 'resetPassword' | 'invite';
  oobCode?: string;
  apiKey: string;
  continueUrl?: string;
  lang?: string;
  e?: string;
  n?: string;
};
