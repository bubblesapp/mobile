import {Action} from '../../state/Action';
import {AuthState} from './state';

export class AuthStateChangedAction extends Action<AuthState> {
  constructor(public payload: AuthState) {
    super();
  }
}

export class SetVerifyingEmailAction extends Action<boolean> {
  constructor(public payload: boolean) {
    super();
  }
}

export type AuthAction = AuthStateChangedAction
  | SetVerifyingEmailAction;
