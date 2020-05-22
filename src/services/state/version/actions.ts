import {Action} from '../Action';

export class CurrentVersionChangedAction extends Action<string> {
  constructor(public payload: string) {
    super();
  }
}

export class LatestVersionChangedAction extends Action<string> {
  constructor(public payload: string) {
    super();
  }
}

export class IsUpdatingChangedAction extends Action<boolean> {
  constructor(public payload: boolean) {
    super();
  }
}

export type VersionAction =
  | CurrentVersionChangedAction
  | LatestVersionChangedAction
  | IsUpdatingChangedAction;
