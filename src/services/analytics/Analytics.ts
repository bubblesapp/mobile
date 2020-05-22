import amplitude from 'amplitude-js';
import ExpoConstants from 'expo-constants';

export const Analytics = {
  init: () =>
    amplitude.getInstance().init(ExpoConstants.manifest.extra.amplitudeApiKey),
  setUserId: (uid: string) => amplitude.getInstance().setUserId(uid),
  logEvent: (event: string) => amplitude.getInstance().logEvent(event),
  set: (property: string, value: any) =>
    amplitude
      .getInstance()
      .identify(new amplitude.Identify().set(property, value)),
  setVersionName: () => {
    if (ExpoConstants.manifest?.version) {
      amplitude.getInstance().setVersionName(ExpoConstants.manifest?.version);
    }
  },
};

export enum Events {
  LogIn = 'log_in',
  SignUp = 'sign_up',
  VerifyEmail = 'verify_email',
  ShareBubbleLink = 'share_bubble_link',
  CopyBubbleLink = 'copy_bubble_link',
  SetLastMetDate = 'set_last_met',
  AcceptInvite = 'accept_invite',
  DeclineInvite = 'decline_invite',
  SendAlert = 'send_alert',
  DeleteAlert = 'delete_alert',
  LogOut = 'log_out',
}
