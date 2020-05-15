import React, {Dispatch, ReducerAction, useContext, useEffect, useMemo, useReducer,} from 'react';
import {authInitialState, AuthState} from './state/state';
import {authReducer, AuthReducer} from './state/reducer';
import {AuthStateChangedAction} from './state/actions';
import {useAPI} from '../api/useAPI';
import {Platform} from 'react-native';
// @ts-ignore
import {firebaseAuth, setPersistence} from './FirebaseAuth';
import {API, Device} from '@bubblesapp/api';
import {Analytics, Events} from '../analytics/Analytics';
import env from '../../active.env';
import ENV from '../../environment';
import _ from 'lodash';

class Auth {
  constructor(
    public state: AuthState,
    private dispatch: Dispatch<ReducerAction<AuthReducer>>,
    private api: API,
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
    url: ENV[env].baseUrl,
  };

  changeState = (authState: AuthState) =>
    this.dispatch(new AuthStateChangedAction(authState));

  refreshState = async () => {
    const user = firebaseAuth().currentUser;
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
      await setPersistence(remember);
    }
    return await firebaseAuth()
      .signInWithEmailAndPassword(email, password)
      .then((credentials) => {
        Analytics.logEvent(Events.LogIn);
        return credentials.user.uid;
      });
  };

  signUp = async (
    email: string,
    password: string,
  ): Promise<string> => {
    const credentials = await firebaseAuth().createUserWithEmailAndPassword(
      email,
      password,
    );
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

  sendVerificationEmail = async () => {
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
  };

  signOut = async (): Promise<void> => {
    Analytics.logEvent(Events.LogOut);
    await firebaseAuth().signOut();
  };

  resetPassword = async (email: string): Promise<void> => {
    await firebaseAuth().sendPasswordResetEmail(email, Auth.actionCodeSettings);
  };

  verifyPasswordResetCode = async (oobCode: string): Promise<string> =>
    await firebaseAuth().verifyPasswordResetCode(oobCode);

  confirmResetPassword = async (
    code: string,
    password: string,
  ): Promise<void> => await firebaseAuth().confirmPasswordReset(code, password);

  getCurrentUser = (): string | undefined => firebaseAuth().currentUser?.uid;

  changePassword = async (
    currentPassword: string,
    newPassword: string,
  ): Promise<void> => {
    await this.reauthenticate(currentPassword);
    await firebaseAuth().currentUser?.updatePassword(newPassword);
  };

  private getCredential(password: string) {
    const currentEmail = firebaseAuth().currentUser?.email;
    if (!currentEmail) {
      throw 'Not authenticated';
    }
    return firebaseAuth.EmailAuthProvider.credential(currentEmail, password);
  }

  private async reauthenticate(password: string) {
    const credential = this.getCredential(password);
    await firebaseAuth().currentUser?.reauthenticateWithCredential(credential);
  }

  changeEmail = async (email: string, password: string): Promise<void> => {
    const credential = this.getCredential(password);
    await firebaseAuth().currentUser?.reauthenticateWithCredential(credential);
    await firebaseAuth().currentUser?.updateEmail(email);
    await this.api.profiles.update({email});
    await firebaseAuth().currentUser?.reload();
    await this.sendVerificationEmail();
    await this.refreshState();
  };

  changeName = async (name: string): Promise<void> => {
    const trimmedName = _.trim(name);
    await firebaseAuth().currentUser?.updateProfile({
      displayName: trimmedName,
    });
    await this.api.profiles.update({name: trimmedName});
    await firebaseAuth().currentUser?.reload();
    await this.refreshState();
  };

  deleteUser = async (password?: string): Promise<void> => {
    if (password) {
      await this.reauthenticate(password);
    }
    await this.api.profiles.delete();
    await firebaseAuth().currentUser?.delete();
    await firebaseAuth().signOut();
  };
}

export const AuthContext = React.createContext<Auth>(null);

export const AuthProvider: React.FC = (props): JSX.Element => {
  const [state, dispatch] = useReducer<AuthReducer>(
    authReducer,
    authInitialState,
  );

  const api = useAPI();

  const auth = useMemo<Auth>(() => new Auth(state, dispatch, api), [
    state,
    dispatch,
  ]);

  useEffect(() => {
    return firebaseAuth().onAuthStateChanged(async (user) => {
      console.log('Auth state changed', user);
      if (user?.uid && Platform.OS !== 'web') {
        const messaging = await import('@react-native-firebase/messaging');
        const token = await messaging.default().getToken();
        const device: Device = {
          platform: Platform.OS === 'ios' ? 'ios' : 'android',
          id: token,
          token,
        };
        await api.devices.set(device, user?.uid);
      }
      await auth.refreshState();
    });
  }, []);

  return <AuthContext.Provider value={auth} {...props} />;
};

export const useAuth = () => {
  const context = useContext<Auth>(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
