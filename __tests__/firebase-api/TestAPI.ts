import firebase from 'firebase';

export class TestAPI {
  static createFriend = async (
    client: firebase.app.App,
    forUid: string,
    friendUid: string,
  ) => {
    await client
      .firestore()
      .collection('users')
      .doc(forUid)
      .collection('friends')
      .doc(friendUid)
      .set({uid: friendUid});
  };

  static removeFriend = async (
    client: firebase.app.App,
    fromUid: string,
    friendUid: string,
  ) => {
    await client
      .firestore()
      .collection('users')
      .doc(fromUid)
      .collection('friends')
      .doc(friendUid)
      .delete();
  };

  static updateLastMet = async (
    client: firebase.app.App,
    uid: string,
    friendUid: string,
    lastMet: number = new Date().getTime(),
  ) => {
    await TestAPI.updateLastMetInFriend(client, uid, friendUid, lastMet);
    await TestAPI.updateLastMetInFriend(client, friendUid, uid, lastMet);
  };

  static updateLastMetInFriend = async (
    client: firebase.app.App,
    uid: string,
    friendUid: string,
    lastMet: number = new Date().getTime(),
  ) => {
    await client
      .firestore()
      .collection('users')
      .doc(uid)
      .collection('friends')
      .doc(friendUid)
      .update({lastMet});
  };

  static createIncomingInvite = async (
    client: firebase.app.App,
    inUid: string,
    fromUid: string,
    toEmail: string,
  ) => {
    const invite = {
      from: fromUid,
      to: toEmail,
      createdAt: new Date().getTime(),
      accepted: false,
    };

    await client
      .firestore()
      .collection('users')
      .doc(inUid)
      .collection('incomingInvites')
      .doc(fromUid)
      .set(invite);
  };
}
