import firebase from 'firebase/app';
import 'firebase/auth';

const setPersistence = (remember: boolean) =>
  firebaseAuth().setPersistence(
    remember
      ? firebase.auth.Auth.Persistence.LOCAL
      : firebase.auth.Auth.Persistence.SESSION,
  );
const firebaseAuth = firebase.auth;

export {setPersistence, firebaseAuth};
