import amplitude from 'amplitude-js';
import ENV from '../../environment';
import env from '../../active.env';
import Constants from 'expo-constants';

export const Analytics = {
  init: () => amplitude.getInstance().init(ENV[env].amplitudeApiKey),
  setUserId: (uid: string) => amplitude.getInstance().setUserId(uid),
  logEvent: (event: string) => amplitude.getInstance().logEvent(event),
  set: (property: string, value: any) =>
    amplitude
      .getInstance()
      .identify(new amplitude.Identify().set(property, value)),
  setVersionName: () => {
    if (Constants.manifest?.version) {
      amplitude.getInstance().setVersionName(Constants.manifest?.version);
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
