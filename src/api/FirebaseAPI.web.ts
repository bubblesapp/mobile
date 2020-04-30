import {FirebaseAPI} from '@bubblesapp/api';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB1uHwOarBrIvaSYnMgYxnoH1UKWGkIiUc', //process.env.REACT_APP_FIREBASE_API_KEY,
  projectId: 'bubbles-273e5', //process.env.REACT_APP_FIREBASE_PROJECT_ID,
};
export const api = new FirebaseAPI(firebase.initializeApp(firebaseConfig));
