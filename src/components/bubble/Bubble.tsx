import React, {useEffect, useState} from 'react';
import {Bubble as BubbleModel} from '@bubblesapp/api';
import {useAPI} from '../../api/useAPI';
import {
  Image,
  ImageStyle,
  Linking,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
  Dimensions,
} from 'react-native';
import {customTheme} from '../../theme/theme';
import {useAuth} from '../../auth/Auth';
import {BubbleLists} from './BubbleLists';
import {Wrapper} from '../common/Wrapper';
import assets from '../../assets';
import I18n from '../../i18n';
import {Button} from 'react-native-elements';

const openRecommendations = async () => {
  await Linking.openURL(
    'https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public',
  );
};

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
    <Wrapper
      topColor={customTheme.colors.green}
      bottomColor={'#fff'}
      scrollEnabled={true}>
      <View style={styles.header}>
        <Text style={styles.title}>Laura's Bubble</Text>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>No alerts</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.middle}>
          <View style={[styles.bubbleTextContainer]}>
            <Image source={assets.images.bubble.bubble} style={styles.bubble} />
            <View style={styles.bubbleAlertContainer}>
              <Image
                source={assets.images.bubble.alert}
                style={styles.bubbleAlert}
              />
            </View>
          </View>
          <View style={styles.recommendationsContainer}>
            <Text style={styles.takeCareText}>{I18n.t('bubble.takeCare')}</Text>
            <Button
              onPress={() => openRecommendations()}
              buttonStyle={styles.ctaLight}
              title={I18n.t('bubble.recommendationsButton')}
              titleStyle={styles.ctaLightText}
            />
          </View>
        </View>
        <BubbleLists />
      </View>
    </Wrapper>
  );
};

/*
<View style={styles.bubbleAlertContainer}>
              <Image
                source={assets.images.bubble.alert}
                style={styles.bubbleAlert}
              />
            </View>
 */

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
  //bubbleTextNumber: TextStyle;
  //bubbleText: TextStyle;
  bubbleAlertContainer: ViewStyle;
  bubbleAlert: ImageStyle;
  takeCareText: TextStyle;
  recommendationsContainer: ViewStyle;
  ctaLight: ViewStyle;
  ctaLightText: TextStyle;
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '5%',
    paddingBottom: '5%',
    height: 0.35 * Dimensions.get('screen').height,
    backgroundColor: customTheme.colors.green,
  },
  title: {
    fontFamily: customTheme.boldFontFamily,
    fontSize: 24,
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
    fontFamily: customTheme.boldFontFamily,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: customTheme.colors.lightBlue,
  },
  middle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendationsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 16,
    marginTop: 75,
    marginBottom: 24,
    //marginBottom: Dimensions.LANGUETTE_ALWAYS_OPEN + Dimensions.TAB_BAR_HEIGHT,
  },
  takeCareText: {
    color: customTheme.colors.gray,
    fontFamily: customTheme.boldFontFamily,
    fontSize: 20,
    marginBottom: 24,
  },
  bubble: {
    width: 124,
    height: 111,
  },
  bubbleTextContainer: {
    width: 155,
    height: 139,
    position: 'absolute',
    zIndex: 2,
    top: -70,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  /*bubbleTextNumber: {
    fontSize: 26,
    fontFamily: customTheme.boldFontFamily,
    color: customTheme.colors.darkBlue,
  },
  bubbleText: {
    fontSize: 14,
    fontFamily: customTheme.boldFontFamily,
    color: customTheme.colors.darkBlue,
  },*/
  bubbleAlertContainer: {
    position: 'absolute',
    width: 90,
    height: 90,
    //backgroundColor: 'rgba(255, 255, 255, 0.35)',
    borderRadius: 45,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  bubbleAlert: {
    width: 75,
    height: 75,
  },
  ctaLight: {
    backgroundColor: customTheme.colors.lightBlue,
    borderWidth: 1,
    borderColor: customTheme.colors.ctaBackground,
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 32,
  },
  ctaLightText: {
    color: customTheme.colors.ctaBackground,
    fontFamily: customTheme.boldFontFamily,
  },
});
