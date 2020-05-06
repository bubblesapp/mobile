import React from 'react';
import {Platform, SafeAreaView, ScrollView, View} from 'react-native';
import {profileStyles as styles} from '../profile/Styles';

type Props = {
  topColor?: string;
  bottomColor?: string;
};

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <>
      <SafeAreaView
        style={{flex: 0, backgroundColor: props.topColor}}
      />
      <SafeAreaView style={[styles.wrapper, {backgroundColor: props.bottomColor}]}>
        <ScrollView
          accessible={false}
          style={{backgroundColor: props.bottomColor}}
          contentContainerStyle={{flexGrow: 1}}>
          {Platform.OS === 'ios' && (
            <View
              style={{
                backgroundColor: props.topColor,
                height: 1000,
                position: 'absolute',
                top: -1000,
                left: 0,
                right: 0,
              }}
            />
          )}
          {props.children}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
