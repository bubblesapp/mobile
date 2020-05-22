import {Platform} from 'react-native';
import {FirebaseAPI} from '@bubblesapp/api';

let firebase;
let firebaseConfig;

if (Platform.OS === 'web') {
  firebase = require('firebase/app');
  require('firebase/firestore');
  firebaseConfig = require('expo-constants').manifest.extra.firebaseConfig;
} else {
  firebase = require('@react-native-firebase/app');
  require('@react-native-firebase/firestore');
}

export const api = new FirebaseAPI(firebase.initializeApp(firebaseConfig));
