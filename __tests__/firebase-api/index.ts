import * as fs from 'fs';
import path from 'path';
import * as firebaseTesting from '@firebase/testing';
import firebase from 'firebase';
import Chance from 'chance';

export const projectId: string = process.env.GCLOUD_PROJECT!!;

export const rules = fs.readFileSync(
  path.resolve(__dirname, '../../../firestore.rules'),
  'utf8',
);

export const chance = new Chance();

export type Auth = {
  uid: string;
  email: string;
};

export function createTestClientApp(auth: Auth): firebase.app.App {
  return firebaseTesting.initializeTestApp({projectId, auth});
}

export function createTestClientAdminApp(): firebase.app.App {
  return firebaseTesting.initializeAdminApp({projectId});
}
