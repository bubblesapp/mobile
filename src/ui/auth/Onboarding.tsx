import React, {useRef, useState} from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {customTheme} from '../theme';
import {Title} from '../common/Title';
import I18n from '../../services/i18n';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../services/navigation/Routes';
import {useAsyncStorage} from '../../services/util/useAsyncStorage';
import {Splash} from './Splash';
import {useDevice} from '../../services/util/useDevice';
import {DeviceType} from 'expo-device';
import {Helmet} from 'react-helmet';
import {PlatformAwareWrapper} from '../common/PlatformAwareWrapper';
import assets from '../assets';

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
    image: assets.images.onboarding.screen1,
    imageStyle: {
      width: 246,
      height: 255,
      marginVertical: 16,
    },
  },
  {
    key: '2',
    heading1: I18n.t('onboarding.screen2.heading1'),
    heading2: I18n.t('onboarding.screen2.heading2'),
    image: assets.images.onboarding.screen2,
    imageStyle: {
      width: 236,
      height: 230,
      marginVertical: 32,
    },
  },
  {
    key: '3',
    heading1: I18n.t('onboarding.screen3.heading1'),
    heading2: I18n.t('onboarding.screen3.heading2'),
    image: assets.images.onboarding.screen3[I18n.locale],
    imageStyle: {
      width: 256,
      height: 263,
      marginVertical: 32,
    },
  },
];

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: customTheme.colors.lightBlue,
    flexDirection: 'column',
    justifyContent: 'space-between',
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
    paddingHorizontal: 16,
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
    //fontSize: 16,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
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
    opacity: 1,
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
  const [width, setWidth] = useState(0);
  const [onboarded, setOnboarded] = useAsyncStorage('onboarded', false);
  const device = useDevice();
  const slider = useRef<AppIntroSlider<Slide>>(null);

  if (onboarded === null) {
    return <Splash />;
  } else if (onboarded === true) {
    //nav.navigate(Routes.SignIn);
  }

  const goToSignIn = async () => {
    await setOnboarded(true);
    nav.navigate(Routes.SignIn);
  };

  const goToSignUp = async () => {
    await setOnboarded(true);
    nav.navigate(Routes.SignUp);
  };

  const renderPagination = (activeIndex: number) => {
    console.log('renderPagination', activeIndex);
    return (
      <View style={styles.paginationContainer}>
        <View style={styles.paginationDots}>
          {slides.length > 1 &&
            slides.map((_, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.dot,
                  i === activeIndex ? styles.activeDot : undefined,
                ]}
                onPress={() => slider.current?.goToSlide(i, true)}
              />
            ))}
        </View>
      </View>
    );
  };

  return (
    <PlatformAwareWrapper
      style={styles.wrapper}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
      {Platform.OS === 'web' && (
        <Helmet>
          <style>{`body { background-color: ${
            StyleSheet.flatten(styles.wrapper).backgroundColor
          }; }`}</style>
        </Helmet>
      )}
      <AppIntroSlider<Slide>
        ref={slider}
        keyExtractor={(item) => item.heading1}
        data={slides}
        renderItem={(slide: any) => {
          const {item, dimensions} = slide;
          return (
            <View
              style={{
                height: dimensions.height - 32,
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
            </View>
          );
        }}
        renderPagination={renderPagination}
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
          if (slider.current && x % width === 0) {
            slider.current._onMomentumScrollEnd(e);
          }
        }}
      />
      <View style={styles.ctaContainer}>
        <Button
          onPress={() => goToSignIn()}
          buttonStyle={[styles.cta, styles.ctaLight]}
          title={I18n.t('onboarding.login')}
          titleStyle={[styles.ctaText, styles.ctaLightText]}
        />
        <Button
          onPress={() => goToSignUp()}
          buttonStyle={[styles.cta, styles.ctaDark]}
          title={I18n.t('onboarding.signUp')}
          titleStyle={[styles.ctaText, styles.ctaDarkText]}
        />
      </View>
    </PlatformAwareWrapper>
  );
};
