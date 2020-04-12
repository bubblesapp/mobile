import * as firebaseTesting from '@firebase/testing';
import {
  Auth,
  chance,
  createTestClientAdminApp,
  createTestClientApp,
  projectId,
  rules,
} from '../index';
import firebase from 'firebase';
import {assertFails, assertSucceeds} from '@firebase/testing';
import {TestAPI} from '../TestAPI';

describe('Friends security ruleset', () => {
  let auth: Auth;
  let other: Auth;
  let client: firebase.app.App;
  let admin: firebase.app.App;

  beforeAll(async () => {
    await firebaseTesting.loadFirestoreRules({projectId, rules});
  });

  beforeEach(async () => {
    await firebaseTesting.clearFirestoreData({projectId});

    auth = {
      uid: chance.guid(),
      email: chance.email(),
    };

    other = {
      uid: chance.guid(),
      email: chance.email(),
    };

    client = createTestClientApp(auth);
    admin = createTestClientAdminApp();
  });

  it('forbids a user to create a friend for someone else', async () => {
    await firebaseTesting.assertFails(
      TestAPI.createFriend(client, other.uid, auth.uid),
    );
  });

  it('forbids a user to create a friend, if he was not invited', async () => {
    await firebaseTesting.assertFails(
      TestAPI.createFriend(client, auth.uid, other.uid),
    );
  });

  it('allows a user to create a friend, if he was invited', async () => {
    await TestAPI.createIncomingInvite(admin, auth.uid, other.uid, auth.email);
    await firebaseTesting.assertSucceeds(
      TestAPI.createFriend(client, auth.uid, other.uid),
    );
  });

  it('allows a user to update lastMet time in his own data', async () => {
    await TestAPI.createFriend(admin, auth.uid, other.uid);
    await TestAPI.createFriend(admin, other.uid, auth.uid);
    await assertSucceeds(TestAPI.updateLastMet(client, auth.uid, other.uid));
  });

  it("allows a user to update lastMet time in the friend's data", async () => {
    await TestAPI.createFriend(admin, auth.uid, other.uid);
    await TestAPI.createFriend(admin, other.uid, auth.uid);
    await assertSucceeds(
      TestAPI.updateLastMetInFriend(client, other.uid, auth.uid),
    );
  });

  it("forbids a user to update lastMet time in anyone's data", async () => {
    const anyone = chance.guid();
    await TestAPI.createFriend(admin, anyone, other.uid);
    await TestAPI.createFriend(admin, other.uid, anyone);
    await assertFails(TestAPI.updateLastMetInFriend(client, other.uid, anyone));
  });

  it('allows a user to remove one of his friends in his own data', async () => {
    await TestAPI.createFriend(admin, auth.uid, other.uid);
    await TestAPI.createFriend(admin, other.uid, auth.uid);
    await assertSucceeds(TestAPI.removeFriend(client, auth.uid, other.uid));
  });

  it("allows a user to remove himself from someone's friends", async () => {
    await TestAPI.createFriend(admin, auth.uid, other.uid);
    await TestAPI.createFriend(admin, other.uid, auth.uid);
    await assertSucceeds(TestAPI.removeFriend(client, other.uid, auth.uid));
  });

  it("forbids a user to remove anyone's friends", async () => {
    const anyone = chance.guid();
    await TestAPI.createFriend(admin, anyone, other.uid);
    await TestAPI.createFriend(admin, other.uid, anyone);
    await assertFails(TestAPI.removeFriend(client, anyone, other.uid));
  });

  afterEach(async () => {
    await client.delete();
    await admin.delete();
  });

  afterAll(async () => {
    await Promise.all(firebaseTesting.apps().map((app) => app.delete()));
  });
});
