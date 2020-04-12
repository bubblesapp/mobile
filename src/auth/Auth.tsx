import React, {
  Dispatch,
  ReducerAction,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import {authInitialState, AuthState} from './state/state';
import {authReducer, AuthReducer} from './state/reducer';
import firebaseAuth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {AuthStateChangedAction, SetVerifyingEmailAction} from './state/actions';
import {API} from '../api/API';
import {useAPI} from '../api/useAPI';
import Toast from '../components/common/Toast';
import {Platform} from 'react-native';

class Auth {
  constructor(
    public state: AuthState,
    private dispatch: Dispatch<ReducerAction<AuthReducer>>,
    private api: API,
  ) {}

  changeState = (authState: AuthState) =>
    this.dispatch(new AuthStateChangedAction(authState));

  refreshState = async () => {
    const user = firebaseAuth().currentUser;
    console.log(user);
    if (user) {
      const authState = {
        uid: user.uid,
        name: user.displayName || undefined,
        email: user.email || undefined,
        emailVerified: user.emailVerified,
        verifyingEmail: undefined,
      };
      this.changeState(authState);
      console.log('Refresh auth state 1', authState, user.emailVerified);
    } else {
      console.log('Refresh auth state 2', {});
      this.changeState({});
    }
  };

  signIn = async (email: string, password: string): Promise<string> =>
    firebaseAuth()
      .signInWithEmailAndPassword(email, password)
      .then((credentials) => credentials.user.uid);

  signUp = async (
    name: string,
    email: string,
    password: string,
  ): Promise<string> => {
    const credentials = await firebaseAuth().createUserWithEmailAndPassword(
      email,
      password,
    );
    const {uid} = credentials.user;
    await firebaseAuth().currentUser?.updateProfile({
      displayName: name,
    });
    await this.api.setProfile({
      uid,
      email,
      name,
      pushNotificationsEnabled: Platform.OS === 'android',
      emailNotificationsEnabled: true,
    });
    this.refreshState();
    await this.sendVerificationEmail();
    return uid;
  };

  sendVerificationEmail = async () => {
    const settings: FirebaseAuthTypes.ActionCodeSettings = {
      url: `https://bubblesapp.link/email-verification/?email=${
        firebaseAuth().currentUser!!.email
      }`,
      iOS: {
        bundleId: 'org.bubblesapp.bubbles',
      },
      android: {
        packageName: 'org.bubblesapp.bubbles',
        installApp: true,
      },
      handleCodeInApp: true,
      dynamicLinkDomain: 'bubblesapp.page.link',
    };
    console.log(settings);
    await firebaseAuth().currentUser?.sendEmailVerification(settings);
  };

  verifyEmail = async (code: string): Promise<void> => {
    this.dispatch(new SetVerifyingEmailAction(true));
    try {
      console.log('Verifying email', code);
      await firebaseAuth().applyActionCode(code);
    } catch (err) {
      console.log(err);
      Toast.danger(err.message);
    } finally {
      this.dispatch(new SetVerifyingEmailAction(true));
    }
    console.log('Done verifying email');
    await firebaseAuth().currentUser?.reload();
    await this.refreshState();
  };

  signOut = async (): Promise<void> => await firebaseAuth().signOut();

  resetPassword = async (email: string): Promise<void> => {
    await firebaseAuth().sendPasswordResetEmail(email);
  };

  confirmResetPassword = async (
    email: string,
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
    await this.api.setEmail(email);
    await firebaseAuth().currentUser?.reload();
    await this.refreshState();
  };

  changeName = async (name: string): Promise<void> => {
    await firebaseAuth().currentUser?.updateProfile({
      displayName: name,
    });
    await this.api.setName(name);
    await firebaseAuth().currentUser?.reload();
    await this.refreshState();
  };

  deleteUser = async (password: string): Promise<void> => {
    await this.reauthenticate(password);
    await this.api.removeProfile();
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
      if (user?.uid) {
        await api.setDevice(user?.uid);
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
