import {Platform} from 'react-native';

let firebase;
let firebaseConfig;

if (Platform.OS === 'web') {
  firebase = require('firebase/app');
  require('firebase/firestore');
  firebaseConfig = require('expo-constants').default.manifest.extra.firebaseConfig;
} else {
  firebase = require('@react-native-firebase/app');
  require('@react-native-firebase/firestore');
}

export const firebaseApp =
  firebase.apps.length > 0
    ? firebase.app()
    : firebase.initializeApp(firebaseConfig);
