import {AuthAPI, AuthState} from '../AuthAPI';
import {Dispatch, ReducerAction} from 'react';
import {AuthReducer} from '../state/reducer';
import {API} from '@bubblesapp/api';
import ExpoConstants from 'expo-constants';
import {AuthStateChangedAction} from '../state/actions';
import {Platform} from 'react-native';
import {Analytics, Events} from '../../analytics/Analytics';
import _ from 'lodash';
import firebase from 'firebase';

export class FirebaseAuth implements AuthAPI {
  constructor(
    public state: AuthState,
    private dispatch: Dispatch<ReducerAction<AuthReducer>>,
    private api: API,
    private firebaseApp: firebase.app,
  ) {}

  static actionCodeSettings = {
    /*iOS: {
      bundleId: 'org.bubblesapp.bubbles',
    },
    android: {
      packageName: 'org.bubblesapp.bubbles',
      installApp: true,
    },
    handleCodeInApp: true,
    dynamicLinkDomain: ENV[env].dynamicLinksDomain,*/
    handleCodeInApp: false,
    url: ExpoConstants.manifest.extra.baseUrl,
  };

  private changeState = (authState: AuthState) =>
    this.dispatch(new AuthStateChangedAction(authState));

  public refreshState = async () => {
    const user = this.firebaseApp.auth().currentUser;
    if (user) {
      const authState = {
        uid: user.uid,
        name: user.displayName || undefined,
        email: user.email || undefined,
        emailVerified: user.emailVerified,
        verifyingEmail: undefined,
      };
      //Analytics.setUserId(user.uid);
      this.changeState(authState);
    } else {
      this.changeState({});
    }
  };

  signIn = async (
    email: string,
    password: string,
    remember: boolean = false,
  ): Promise<string> => {
    if (Platform.OS === 'web') {
      await this.firebaseApp
        .auth()
        .setPersistence(
          remember
            ? firebase.auth.Auth.Persistence.LOCAL
            : firebase.auth.Auth.Persistence.SESSION,
        );
    }
    return await this.firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((credentials) => {
        Analytics.logEvent(Events.LogIn);
        return credentials.user.uid;
      });
  };

  signUp = async (email: string, password: string): Promise<string> => {
    const credentials = await this.firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const {uid} = credentials.user;
    await this.api.profiles.set({
      uid,
      email,
      pushNotificationsEnabled: Platform.OS === 'android',
      emailNotificationsEnabled: false,
    });
    this.refreshState().catch((err) => console.log(err));
    //await this.sendVerificationEmail();
    Analytics.logEvent(Events.SignUp);
    return uid;
  };

  /*sendVerificationEmail = async () => {
    await firebaseAuth().currentUser?.sendEmailVerification(
      Auth.actionCodeSettings,
    );
  };

  verifyEmail = async (code: string): Promise<void> => {
    await firebaseAuth().applyActionCode(code);
    await firebaseAuth().currentUser?.reload();
    await this.refreshState();
    Analytics.logEvent(Events.VerifyEmail);
  };

  restoreEmail = async (code: string): Promise<void> => {
    console.log('Restoring email', code);
    await firebaseAuth().applyActionCode(code);
    console.log('Done restoring email');
    await firebaseAuth().currentUser?.reload();
    await this.refreshState();
  };*/

  signOut = async (): Promise<void> => {
    Analytics.logEvent(Events.LogOut);
    await this.firebaseApp.auth().signOut();
  };

  initiatePasswordReset = async (email: string): Promise<void> => {
    await this.firebaseApp
      .auth()
      .sendPasswordResetEmail(email, FirebaseAuth.actionCodeSettings);
  };

  verifyPasswordResetCode = async (oobCode: string): Promise<string> =>
    await this.firebaseApp.auth().verifyPasswordResetCode(oobCode);

  finalizePasswordReset = async (
    code: string,
    password: string,
  ): Promise<void> => {
    const email = await this.firebaseApp.auth().verifyPasswordResetCode(code);
    await this.firebaseApp.auth().confirmPasswordReset(code, password);
    await this.signIn(email, password, true);
  };

  //getCurrentUser = (): string | undefined => firebaseAuth().currentUser?.uid;

  changePassword = async (
    currentPassword: string,
    newPassword: string,
  ): Promise<void> => {
    await this.reauthenticate(currentPassword);
    await this.firebaseApp.auth().currentUser?.updatePassword(newPassword);
  };

  private getCredential(password: string) {
    const currentEmail = this.firebaseApp.auth().currentUser?.email;
    if (!currentEmail) {
      throw 'Not authenticated';
    }
    return this.firebaseApp.auth.EmailAuthProvider.credential(
      currentEmail,
      password,
    );
  }

  private async reauthenticate(password: string) {
    const credential = this.getCredential(password);
    await this.firebaseApp
      .auth()
      .currentUser?.reauthenticateWithCredential(credential);
  }

  changeEmail = async (email: string, password: string): Promise<void> => {
    const credential = this.getCredential(password);
    await this.firebaseApp
      .auth()
      .currentUser?.reauthenticateWithCredential(credential);
    await this.firebaseApp.auth().currentUser?.updateEmail(email);
    await this.api.profiles.update({email});
    await this.firebaseApp.auth().currentUser?.reload();
    //await this.sendVerificationEmail();
    await this.refreshState();
  };

  changeName = async (name: string): Promise<void> => {
    const trimmedName = _.trim(name);
    await this.firebaseApp.auth().currentUser?.updateProfile({
      displayName: trimmedName,
    });
    await this.api.profiles.update({name: trimmedName});
    await this.firebaseApp.auth().currentUser?.reload();
    await this.refreshState();
  };

  deleteUser = async (password?: string): Promise<void> => {
    if (password) {
      await this.reauthenticate(password);
    }
    await this.api.profiles.delete();
    await this.firebaseApp.auth().currentUser?.delete();
    await this.firebaseApp.auth().signOut();
  };

  registerAuthStateChangeHandler = () => {
    return this.firebaseApp.auth().onAuthStateChanged(async (user) => {
      console.log('Auth state changed', user);
      /* if (user?.uid && Platform.OS !== 'web') {
        const messaging = await import('@react-native-firebase/messaging');
        const token = await messaging.default().getToken();
        const device: Device = {
          platform: Platform.OS === 'ios' ? 'ios' : 'android',
          id: token,
          token,
        };
        await api.devices.set(device, user?.uid);
      } */
      await this.refreshState();
    });
  };
}
