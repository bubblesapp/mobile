import {API} from '../api/API';
import {Friend} from '../models/Friend';
import {Observable} from 'rxjs';
import {Invite} from '../models/Invite';
import {Profile} from '../models/Profile';
import {Bubble} from '../models/Bubble';
import firebaseAuth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import {Device} from '../models/Device';
import {Platform} from 'react-native';

export class FirebaseAPI implements API {
  private uid = (): string => {
    if (!firebaseAuth().currentUser?.uid) {
      throw 'Not authenticated';
    }
    return firebaseAuth().currentUser?.uid!!;
  };

  private userRef = (uid: string) => firestore().collection('users').doc(uid);

  private profileRef = (uid: string) =>
    firestore().collection('profiles').doc(uid);

  async setName(name: string): Promise<void> {
    await this.profileRef(this.uid()).update({name});
  }

  async setEmail(email: string): Promise<void> {
    await this.profileRef(this.uid()).update({email});
  }

  async setPushNotifications(enabled: boolean): Promise<void> {
    await this.profileRef(this.uid()).update({
      pushNotificationsEnabled: enabled,
    });
  }

  async setEmailNotifications(enabled: boolean): Promise<void> {
    await this.profileRef(this.uid()).update({
      emailNotificationsEnabled: enabled,
    });
  }

  async setProfile(profile: {
    uid: string;
    email: string;
    name: string;
    pushNotificationsEnabled: boolean,
    emailNotificationsEnabled: boolean,
  }): Promise<void> {
    await this.profileRef(profile.uid).set(profile);
  }

  async removeProfile(): Promise<void> {
    await this.profileRef(this.uid()).delete();
  }

  observeProfile(uid: string): Observable<Profile> {
    return new Observable<Profile>((observer) =>
      this.profileRef(uid).onSnapshot({
        next: (doc) => observer.next(doc.data() as Profile),
        complete: () => observer.complete(),
      }),
    );
  }

  private userFriendsRef = () =>
    firestore().collection('users').doc(this.uid()).collection('friends');

  private userInFriendRef = (friendUid: string) =>
    firestore()
      .collection('users')
      .doc(friendUid)
      .collection('friends')
      .doc(this.uid());

  private userFriendRef = (uid: string) => this.userFriendsRef().doc(uid);

  observeFriends(): Observable<Friend[]> {
    return new Observable<Friend[]>((observer) =>
      this.userFriendsRef().onSnapshot({
        next: (qs) =>
          observer.next(
            qs.docs.map((doc) => {
              const data = doc.data();
              return {
                uid: doc.ref.id,
                profile: this.observeProfile(doc.ref.id),
                lastMet: data.lastMet,
              };
            }),
          ),
        complete: () => observer.complete(),
      }),
    );
  }

  setLastMet = async (uid: string, lastMet: number): Promise<void> => {
    this.userFriendRef(uid)
      .update({lastMet})
      .catch((err) => {
        console.log(err);
        // Rollback
      });
    this.userInFriendRef(uid)
      .update({lastMet})
      .catch((err) => {
        console.log(err);
        // Rollback
      });
  };

  private invitesFromQuerySnapshot = (incoming: boolean, qs: any): Invite[] => {
    return qs.docs.map((doc: any) => {
      const data = doc.data() as Invite;
      return {
        from: data.from,
        to: data.to,
        createdAt: data.createdAt,
        profile: incoming
          ? this.observeProfile(data.from) // Incoming invite
          : undefined, // Outgoing invite
      };
    });
  };

  private userIncomingInvitesRef = () =>
    firestore()
      .collection('users')
      .doc(this.uid())
      .collection('incomingInvites');

  observeIncomingInvites(): Observable<Invite[]> {
    return new Observable<Invite[]>((observer) =>
      this.userIncomingInvitesRef()
        .orderBy('createdAt', 'desc')
        .onSnapshot({
          next: (qs) => observer.next(this.invitesFromQuerySnapshot(true, qs)),
          complete: () => observer.complete(),
        }),
    );
  }

  private userOutgoingInvitesRef = () =>
    firestore()
      .collection('users')
      .doc(this.uid())
      .collection('outgoingInvites');

  observeOutgoingInvites(): Observable<Invite[]> {
    return new Observable<Invite[]>((observer) =>
      this.userOutgoingInvitesRef()
        .orderBy('createdAt', 'desc')
        .onSnapshot({
          next: (qs) => observer.next(this.invitesFromQuerySnapshot(false, qs)),
          complete: () => observer.complete(),
        }),
    );
  }

  private emailInvitesRef = () => firestore().collection('emailInvites');

  async invite(email: string): Promise<void> {
    const uid = this.uid();
    const invite: Invite = {
      from: uid,
      to: email,
      accepted: false,
      createdAt: new Date().getTime(),
    };
    const newInviteRef = this.userOutgoingInvitesRef().doc();
    await newInviteRef.set(invite);
    await this.emailInvitesRef().doc(newInviteRef.id).set(invite);
  }

  async cancelInvite(email: string): Promise<void> {
    const invites = await this.userOutgoingInvitesRef()
      .where('to', '==', email)
      .get();
    await Promise.all(invites.docs.map((qds) => qds.ref.delete()));
  }

  async createFriend(friendUid: string): Promise<void> {
    const friend = {
      uid: friendUid,
    };
    await this.userFriendRef(friend.uid).set(friend);
  }

  async acceptInvite(fromUid: string): Promise<void> {
    this.userIncomingInvitesRef()
      .doc(fromUid)
      .update({accepted: true})
      .catch((err) => {
        console.log(err);
        // Rollback
        this.userIncomingInvitesRef().doc(fromUid).update({accepted: false});
      });
    this.createFriend(fromUid).catch((err) => {
      console.log(err);
      // Rollback
      this.removeFriend(fromUid);
    });
    this.userIncomingInvitesRef().doc(fromUid).delete();
  }

  async declineInvite(fromUid: string): Promise<void> {
    await this.userIncomingInvitesRef().doc(fromUid).delete();
  }

  removeFriend = async (friendUid: string): Promise<void> => {
    this.userInFriendRef(friendUid)
      .delete()
      .catch((err) => {
        console.log(err);
        // Rollback
      });
    this.userFriendRef(friendUid)
      .delete()
      .catch((err) => {
        console.log(err);
        // Rollback
      });
  };

  bubblesRef = () => firestore().collection('bubbles');

  bubbleRef = (uid: string) => this.bubblesRef().doc(uid);

  observeBubble(uid: string): Observable<Bubble> {
    return new Observable<Bubble>((observer) =>
      this.bubbleRef(uid).onSnapshot({
        next: (doc) => observer.next(doc.data() as Bubble),
        complete: () => observer.complete(),
      }),
    );
  }

  popBubble = async (uid: string): Promise<void> => {
    await this.bubbleRef(uid).update({isPopped: true});
  };

  resetBubble = async (uid: string): Promise<void> => {
    await this.bubbleRef(uid).update({isPopped: false});
  };

  private devicesRef = (uid: string) => this.userRef(uid).collection('devices');

  setDevice = async (uid: string): Promise<void> => {
    const token = await messaging().getToken();
    const device: Device = {
      platform: Platform.OS === 'ios' ? 'ios' : 'android',
      id: token,
      token,
    };
    await this.devicesRef(uid).doc(device.id).set(device);
  };
}
