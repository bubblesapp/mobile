import React from 'react';
import {Image, KeyboardAvoidingView, Platform, StyleSheet, View, ViewStyle} from 'react-native';
import {customTheme} from '../../theme/theme';

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.wrapper}>
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
    backgroundColor: customTheme.colors.pink,
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
