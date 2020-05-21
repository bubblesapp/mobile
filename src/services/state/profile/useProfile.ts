import {useContext} from 'react';
import {ProfileState} from './Profile';
import {ProfileContext} from './ProfileStateProvider';

export const useProfile = () => useContext<ProfileState>(ProfileContext);
