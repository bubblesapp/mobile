import React, {useEffect, useState} from 'react';
import {Bubble as BubbleModel} from '@bubblesapp/api';
import {useAPI} from '../../api/useAPI';
import {Image, ImageStyle, ScrollView, StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import {customTheme} from '../../theme/theme';
import {useAuth} from '../../auth/Auth';
import {BubbleLists} from './BubbleLists';

export const Bubble: React.FC = () => {
  const [bubble, setBubble] = useState<BubbleModel | undefined>();
  const api = useAPI();
  const auth = useAuth();

  useEffect(() => {
    const bubbleSubscription = api.bubble.observe().subscribe((bu) => {
      setBubble(bu);
    });
    return () => bubbleSubscription.unsubscribe();
  }, [api]);

  return (
    <ScrollView accessible={false} style={{backgroundColor: '#fff'}} contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.title}>Laura's Bubble</Text>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>No alerts</Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.middle}>
            <Image
              source={require('../../../assets/images/Bubble.png')}
              style={styles.bubble}
            />
            <View style={styles.bubbleTextContainer}>
              <Text style={styles.bubbleTextNumber}>12</Text>
              <Text style={styles.bubbleText}>people</Text>
            </View>
          </View>
          <BubbleLists />
        </View>
      </View>
    </ScrollView>
  );
};

type Styles = {
  wrapper: ViewStyle;
  header: ViewStyle;
  title: TextStyle;
  badgeContainer: ViewStyle;
  badgeText: TextStyle;
  content: ViewStyle;
  middle: ViewStyle;
  bubble: ImageStyle;
  bubbleTextContainer: ViewStyle;
  bubbleTextNumber: TextStyle;
  bubbleText: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: customTheme.colors.green,
    height: 250,
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
    color: customTheme.colors.gray,
    marginVertical: 16,
  },
  badgeContainer: {
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: customTheme.colors.green,
    fontFamily: 'Nunito-Bold',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: customTheme.colors.lightBlue,
  },
  middle: {
    height: 100,
    flexDirection: 'column',
    alignItems: 'center',
  },
  bubble: {
    width: 155,
    height: 139,
    position: 'absolute',
    zIndex: 4,
    top: -70,
  },
  bubbleTextContainer: {
    width: 155,
    height: 139,
    position: 'absolute',
    zIndex: 4,
    top: -70,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleTextNumber: {
    fontSize: 26,
    fontFamily: 'Nunito-Bold',
    color: customTheme.colors.darkBlue,
  },
  bubbleText: {
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
    color: customTheme.colors.darkBlue,
  },
});
