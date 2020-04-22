//import {API} from './API';
//import {FirebaseAPI} from '../firebase-api/FirebaseAPI';
import {FirebaseAPI as FBAPI} from '@bubblesapp/api';
import firebase from '@react-native-firebase/app';

export const api = new FBAPI(firebase.app());
