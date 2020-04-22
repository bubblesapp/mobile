import firebase from 'firebase/app';
import 'firebase/firestore';

import {FirebaseAPI as FBAPI} from '@bubblesapp/api';

const firebaseConfig = {
  apiKey: 'AIzaSyB1uHwOarBrIvaSYnMgYxnoH1UKWGkIiUc',
  authDomain: 'bubbles-273e5.firebaseapp.com',
  databaseURL: 'https://bubbles-273e5.firebaseio.com',
  projectId: 'bubbles-273e5',
  storageBucket: 'bubbles-273e5.appspot.com',
  messagingSenderId: '356152312751',
  appId: '1:356152312751:web:8139860aa9bede34e5e55a',
  measurementId: 'G-R0KHKP6E27',
};
export const api = new FBAPI(firebase.initializeApp(firebaseConfig));
