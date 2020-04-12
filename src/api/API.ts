import {Bubble} from '../models/Bubble';
import {Invite} from '../models/Invite';
import {Friend} from '../models/Friend';
import {Observable} from 'rxjs';
import {Profile} from '../models/Profile';

export interface API {
  observeBubble(uid: string): Observable<Bubble>;
  observeProfile(uid: string): Observable<Profile>;
  observeIncomingInvites(): Observable<Invite[]>;
  observeOutgoingInvites(): Observable<Invite[]>;
  observeFriends(): Observable<Friend[]>;
  setName(name: string): Promise<void>;
  setEmail(email: string): Promise<void>;
  setPushNotifications(enabled: boolean): Promise<void>;
  setEmailNotifications(enabled: boolean): Promise<void>;
  setProfile(profile: {
    uid: string;
    email: string;
    name: string;
    pushNotificationsEnabled: boolean;
    emailNotificationsEnabled: boolean;
  }): Promise<void>;
  removeProfile(): Promise<void>;
  invite(email: string): Promise<void>;
  cancelInvite(email: string): Promise<void>;
  setLastMet(uid: string, timestamp: number): Promise<void>;
  createFriend(friendUid: string): Promise<void>;
  removeFriend(friendUid: string): Promise<void>;
  acceptInvite(fromUid: string): Promise<void>;
  declineInvite(fromUid: string): Promise<void>;
  popBubble(uid: string): Promise<void>;
  resetBubble(uid: string): Promise<void>;
  setDevice(uid: string): Promise<void>;
}
