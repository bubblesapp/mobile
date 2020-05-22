import {Platform, SafeAreaView, View} from 'react-native';

export const PlatformAwareWrapper = Platform.OS === 'web' ? View : SafeAreaView;
