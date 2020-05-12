import React from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  Text,
  Image,
  Linking,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {useMediaQuery} from 'react-responsive';
import {customTheme} from '../../theme/theme';
import assets from '../../assets';
import I18n from '../../i18n';
import {SubmitButton} from './SubmitButton';
import {Icon} from 'react-native-elements';
import Constants from '../../Constants';
import {openURLInNewTab} from '../bubble/utils';

export const ResponsiveContainer: React.FC = ({children}) => {
  const isWide = useMediaQuery({
    query: '(min-width: 1224px)',
  });
  const isIntermediate = useMediaQuery({
    query: '(min-width: 750px)',
  });
  console.log(children);
  return isIntermediate ? (
    <>
      <View style={styles.backWrapper}>
        <View style={styles.disk} />
      </View>
      <View style={styles.frontWrapper}>
        <View style={styles.content}>
          {isWide && (
            <View style={styles.leftContainer}>
              <View
                style={{
                  maxWidth: 250,
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    backgroundColor: customTheme.colors.ctaBackground,
                    width: 90,
                    height: 90,
                    borderRadius: 45,
                  }}>
                  <Image
                    source={assets.images.bubble.avatarMultiBig}
                    style={{width: 90, height: 90}}
                  />
                </View>
                <Text style={styles.title}>{I18n.t('title')}</Text>
                <Text style={styles.subtitle}>
                  {I18n.t('responsiveContainer.leftSubtitle')}
                </Text>
                <SubmitButton
                  title={I18n.t('responsiveContainer.leftButton')}
                  onPress={() => openURLInNewTab(Constants.HOMEPAGE_LINK)}
                />
              </View>
            </View>
          )}
          <View style={styles.centerContainer}>
            <View style={styles.frame}>
              <View style={styles.frameContent}>{children}</View>
            </View>
          </View>
          {isWide && (
            <View style={styles.rightContainer}>
              <View
                style={{
                  height: 100,
                  backgroundColor: '#fff',
                  width: 350,
                  borderTopStartRadius: 50,
                  borderBottomStartRadius: 50,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={assets.images.chrome}
                  style={{width: 64, height: 64, marginHorizontal: 18}}
                />
                <View
                  style={{
                    height: 72,
                    paddingHorizontal: 18,
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'flex-start',
                    borderStartWidth: 1,
                    borderColor: '#EBEBEB',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontFamily: customTheme.boldFontFamily,
                        fontSize: 12,
                        color: '#000',
                      }}>
                      {I18n.t('responsiveContainer.rightTip')}
                    </Text>
                    <Text
                      style={{
                        fontFamily: customTheme.boldFontFamily,
                        fontSize: 12,
                        color: customTheme.colors.ctaBackground,
                      }}>
                      {I18n.t('responsiveContainer.rightInstall')}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 8,
                      borderRadius: 14,
                      backgroundColor: '#EBEBEB',
                      height: 28,
                      alignSelf: 'stretch',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name={'lock'}
                      type={'font-awesome'}
                      color={'#979797'}
                      size={14}
                      style={{marginHorizontal: 8}}
                    />
                    <Text
                      style={{
                        fontFamily: customTheme.boldFontFamily,
                        fontSize: 12,
                        color: '#000',
                        width: '100%',
                        flex: 1,
                      }}>
                      https://app.bubblesapp.org
                    </Text>
                    <View
                      style={{
                        marginHorizontal: 8,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        name={'pluscircleo'}
                        type={'antdesign'}
                        color={customTheme.colors.ctaBackground}
                        size={14}
                      />
                      <View
                        style={{
                          position: 'absolute',
                          top: -16,
                          right: -16,
                          width: 46,
                          height: 46,
                          borderRadius: 23,
                          backgroundColor: 'rgba(49, 77, 203, 0.1)',
                        }}>
                        <Icon
                          name={'mouse-pointer'}
                          type={'font-awesome'}
                          color={customTheme.colors.ctaBackground}
                          size={14}
                          containerStyle={{
                            flex: 1,
                          }}
                          style={{
                            position: 'relative',
                            top: 28,
                            left: 8,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => openURLInNewTab(Constants.LEGAL_NOTICE_LINK)}>
            <Text style={styles.footerText}>
              {I18n.t('profile.legalInfo.legalNotice')}
            </Text>
          </TouchableOpacity>
          <View style={styles.footerSeparator} />
          <TouchableOpacity
            onPress={() => openURLInNewTab(Constants.TERMS_LINK)}>
            <Text style={styles.footerText}>
              {I18n.t('profile.legalInfo.terms')}
            </Text>
          </TouchableOpacity>
          <View style={styles.footerSeparator} />
          <TouchableOpacity
            onPress={() => openURLInNewTab(Constants.PRIVACY_LINK)}>
            <Text style={styles.footerText}>
              {I18n.t('profile.legalInfo.privacy')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  ) : (
    <>{children}</>
  );
};

type Styles = {
  backWrapper: ViewStyle;
  frontWrapper: ViewStyle;
  content: ViewStyle;
  disk: ViewStyle;
  frame: ViewStyle;
  frameContent: ViewStyle;
  leftContainer: ViewStyle;
  centerContainer: ViewStyle;
  rightContainer: ViewStyle;
  footer: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  footerText: TextStyle;
  footerSeparator: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  backWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: customTheme.colors.lightBlue,
    position: 'absolute',
    zIndex: -2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  frontWrapper: {
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  disk: {
    width: 610,
    height: 610,
    borderRadius: 305,
    backgroundColor: customTheme.colors.ctaBackground,
    zIndex: 0,
  },
  content: {
    position: 'relative',
    zIndex: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: customTheme.boldFontFamily,
    color: customTheme.colors.gray,
    fontSize: 40,
    marginTop: 32,
    marginBottom: 0,
  },
  subtitle: {
    fontFamily: customTheme.boldFontFamily,
    color: customTheme.colors.gray,
    fontSize: 16,
    marginTop: 8,
    marginBottom: 32,
  },
  centerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  footer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: customTheme.colors.gray,
    fontFamily: customTheme.boldFontFamily,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  footerSeparator: {
    height: 16,
    width: 1,
    marginHorizontal: 8,
    backgroundColor: customTheme.colors.gray,
  },
  frame: {
    flex: 1,
    width: 432,
    height: 719,
    backgroundColor: '#212121',
    padding: 20,
    borderRadius: 40,
  },
  frameContent: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
});
