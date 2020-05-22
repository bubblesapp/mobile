import {FirebaseAPI} from '@bubblesapp/api';
import {firebaseApp} from './firebaseApp';

export const api = new FirebaseAPI(firebaseApp);
