import React, {useRef, useState} from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import {Image, Platform, SafeAreaView, StyleSheet, Text, View, ViewStyle,} from 'react-native';
import {customTheme} from '../theme/theme';
import {Title} from '../components/auth/common/Title';
import I18n from '../i18n';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Button} from 'react-native-elements';
import {useWindowSize} from '../api/useWindowSize';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../nav/Routes';
import {useAsyncStorage} from '../api/useAsyncStorage';
import {Splash} from './Splash';
import {useDevice} from '../device/useDevice';
import {DeviceType} from 'expo-device';

type Slide = {
  key: string;
  heading1: string;
  heading2: string;
  image: any;
  imageStyle: ViewStyle;
};

const slides: Slide[] = [
  {
    key: '1',
    heading1: I18n.t('onboarding.screen1.heading1'),
    heading2: I18n.t('onboarding.screen1.heading2'),
    image: require('../../assets/images/onboarding/Screen1.png'),
    imageStyle: {
      width: 246,
      height: 229,
      marginVertical: 16,
    },
  },
  {
    key: '2',
    heading1: I18n.t('onboarding.screen2.heading1'),
    heading2: I18n.t('onboarding.screen2.heading2'),
    image: require('../../assets/images/onboarding/Screen2.png'),
    imageStyle: {
      width: 245,
      height: 246,
      marginVertical: 32,
    },
  },
  {
    key: '3',
    heading1: I18n.t('onboarding.screen3.heading1'),
    heading2: I18n.t('onboarding.screen3.heading2'),
    image: require('../../assets/images/onboarding/Screen3.png'),
    imageStyle: {
      width: 173,
      height: 254,
      marginVertical: 32,
    },
  },
];

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: customTheme.colors.lightBlue,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: customTheme.colors.lightBlue,
  },
  heading1: {
    color: customTheme.colors.darkBlue,
    textAlign: 'center',
    fontFamily: customTheme.boldFontFamily,
    fontSize: 26,
    marginVertical: 8,
  },
  heading2: {
    color: customTheme.colors.gray,
    fontFamily: customTheme.fontFamily,
    fontSize: 16,
    textAlign: 'center',
  },
  titleContainer: {
    marginTop: 32,
  },
  buttonCircle: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, .6)',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    color: customTheme.colors.darkBlue,
  },
  cta: {
    height: 50,
    borderRadius: 24,
    marginVertical: 16,
    marginHorizontal: 8,
    paddingHorizontal: 32,
  },
  ctaLight: {
    backgroundColor: customTheme.colors.lightBlue,
    borderWidth: 1,
    borderColor: customTheme.colors.ctaBackground,
  },
  ctaDark: {
    backgroundColor: customTheme.colors.ctaBackground,
  },
  ctaText: {
    fontFamily: customTheme.boldFontFamily,
  },
  ctaLightText: {
    color: customTheme.colors.ctaBackground,
  },
  ctaDarkText: {
    color: '#fff',
  },
  paginationContainer: {
    /*position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,*/
  },
  paginationDots: {
    height: 16,
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
    backgroundColor: customTheme.colors.ctaBackground,
    opacity: 0.2,
  },
  activeDot: {
    backgroundColor: customTheme.colors.ctaBackground,
  },
  ctaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

type Props = {
  onOnboarded: () => void;
};

export const Onboarding: React.FC<Props> = () => {
  const nav = useNavigation();
  const size = useWindowSize();
  const [onboarded, setOnboarded] = useAsyncStorage('onboarded', false);
  const device = useDevice();
  const slider = useRef<AppIntroSlider<Slide>>(null);

  if (onboarded === null) {
    return <Splash />;
  } else if (onboarded === true) {
    nav.navigate(Routes.SignIn);
  }

  const height = size.height ? size.height - 128 : undefined;

  const goToSignIn = async () => {
    await setOnboarded(true);
    nav.navigate(Routes.SignIn);
  };

  const goToSignUp = async () => {
    await setOnboarded(true);
    nav.navigate(Routes.SignUp);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <AppIntroSlider<Slide>
        ref={slider}
        keyExtractor={(item) => item.heading1}
        data={slides}
        renderItem={(slide: any) => {
          const {item} = slide;
          return (
            <View style={[styles.slide, {height}]}>
              <SafeAreaView
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <View style={styles.titleContainer}>
                  <Title />
                </View>
                <Image source={item.image} style={item.imageStyle} />
                <View>
                  <Text style={styles.heading1}>{item.heading1}</Text>
                  <Text style={styles.heading2}>{item.heading2}</Text>
                </View>
              </SafeAreaView>
            </View>
          );
        }}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        showDoneButton={false}
        renderNextButton={() => (
          <View style={styles.buttonCircle}>
            <FontAwesome5
              name={'arrow-right'}
              color={customTheme.colors.darkBlue}
              size={24}
            />
          </View>
        )}
        renderPrevButton={() => (
          <View style={styles.buttonCircle}>
            <FontAwesome5
              name={'arrow-left'}
              color={customTheme.colors.darkBlue}
              size={24}
            />
          </View>
        )}
        showNextButton={device?.type === DeviceType.DESKTOP}
        showPrevButton={device?.type === DeviceType.DESKTOP}
        showSkipButton={false}
        dotClickEnabled={false}
        onScroll={(e) => {
          const {x} = e.nativeEvent.contentOffset;
          const width = size?.width;
          if (!width) {
            return;
          }
          if (slider.current && x % width === 0) {
            slider.current._onMomentumScrollEnd(e);
          }
        }}
      />
      <View style={styles.ctaContainer}>
        <Button
          onPress={() => goToSignIn()}
          buttonStyle={[styles.cta, styles.ctaLight]}
          title={'Log in'}
          titleStyle={[styles.ctaText, styles.ctaLightText]}
        />
        <Button
          onPress={() => goToSignUp()}
          buttonStyle={[styles.cta, styles.ctaDark]}
          title={'Sign up'}
          titleStyle={[styles.ctaText, styles.ctaDarkText]}
        />
      </View>
    </SafeAreaView>
  );
};
