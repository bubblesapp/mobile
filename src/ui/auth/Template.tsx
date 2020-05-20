import React from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View, ViewStyle} from 'react-native';
import {customTheme} from '../theme';
import {PlatformAwareWrapper} from '../common/PlatformAwareWrapper';
import {Helmet} from 'react-helmet';

export type Props = {
  headerStyle?: ViewStyle;
  headerContentStyle?: ViewStyle;
  headerContent?: React.ReactNode;
  titleContainerStyle?: ViewStyle;
  title?: React.ReactNode;
  contentStyle?: ViewStyle;
  content?: React.ReactNode;
};

export const Template: React.FC<Props> = (props) => {
  return (
    <PlatformAwareWrapper style={{flex: 1}}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 0,
          height: '50%',
          backgroundColor: customTheme.colors.pink,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 0,
          top: '50%',
          backgroundColor: customTheme.colors.lightBlue,
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.wrapper}>
        {Platform.OS === 'web' && (
          <Helmet>
            <style>{`html { overflow: hidden; position: fixed; } body { overflow: hidden; position: fixed; }`}</style>
          </Helmet>
        )}
        <View style={[styles.header, props.headerStyle]}>
          <View style={[styles.titleContainer, props.titleContainerStyle]}>
            {props.title}
          </View>
          <View style={[styles.headerContent, props.headerContentStyle]}>
            {props.headerContent}
          </View>
        </View>
        <View style={[styles.content, props.contentStyle]}>
          {props.content}
        </View>
      </KeyboardAvoidingView>
    </PlatformAwareWrapper>
  );
};

type Styles = {
  wrapper: ViewStyle;
  titleContainer: ViewStyle;
  header: ViewStyle;
  headerContent: ViewStyle;
  content: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'scroll',
  },
  titleContainer: {
    marginTop: 64,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems: 'center',
    height: '25%',
    backgroundColor: customTheme.colors.pink,
  },
  headerContent: {},
  content: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: customTheme.colors.lightBlue,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
  },
});
