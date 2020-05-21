import {Reducer} from 'react';
import {
  CurrentVersionChangedAction,
  IsUpdatingChangedAction,
  LatestVersionChangedAction,
  VersionAction,
} from './actions';
import {VersionState} from './VersionState';
import compareVersions from 'compare-versions';

export type VersionActionHandlers = {
  currentVersionChanged: Reducer<VersionState, CurrentVersionChangedAction>;
  latestVersionChanged: Reducer<VersionState, LatestVersionChangedAction>;
  isUpdatingChanged: Reducer<VersionState, IsUpdatingChangedAction>;
};

const versionActionHandlers: VersionActionHandlers = {
  currentVersionChanged: (prevState, action) => {
    const newCurrentVersion = action.payload;
    return {
      ...prevState,
      current: newCurrentVersion,
      isUpdateAvailable:
        compareVersions(prevState.latest, newCurrentVersion) > 0,
    };
  },
  latestVersionChanged: (prevState, action) => {
    const newLatestVersion = action.payload;
    return {
      ...prevState,
      latest: newLatestVersion,
      isUpdateAvailable:
        compareVersions(newLatestVersion, prevState.current) > 0,
    };
  },
  isUpdatingChanged: (prevState, action) => {
    return {
      ...prevState,
      isUpdating: action.payload,
    };
  },
};

export type VersionReducer = Reducer<VersionState, VersionAction>;
export const versionReducer: VersionReducer = (prevState, action) => {
  switch (action.constructor) {
    case CurrentVersionChangedAction:
      return versionActionHandlers.currentVersionChanged(
        prevState,
        action as CurrentVersionChangedAction,
      );
    case LatestVersionChangedAction:
      return versionActionHandlers.latestVersionChanged(
        prevState,
        action as LatestVersionChangedAction,
      );
    case IsUpdatingChangedAction:
      return versionActionHandlers.isUpdatingChanged(
        prevState,
        action as IsUpdatingChangedAction,
      );
    default:
      return prevState;
  }
};
