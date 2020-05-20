import {FirebaseAPI} from '@bubblesapp/api';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

export const api = new FirebaseAPI(firebase.app());
