import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProfileNavigator} from './profile/ProfileNavigator';
import {BubbleNavigator} from './bubble/BubbleNavigator';
import {Routes} from '../../services/navigation/Routes';
import {TabBar} from './TabBar';
import {Platform, StyleSheet, View, ViewStyle} from 'react-native';
import {Helmet} from 'react-helmet';

const BottomTabs = createBottomTabNavigator();

export type MainTabsParamList = {
  BubbleNavigator: undefined;
  ProfileNavigator: undefined;
};

type Props = {
  webCss?: string;
  containerStyle?: ViewStyle;
};

const Container: React.FC<Props> = ({children, ...otherProps}) => {
  return (
    <View style={styles.container}>
      {Platform.OS === 'web' && (
        <Helmet>
          <style>{otherProps.webCss}</style>
        </Helmet>
      )}
      {children}
    </View>
  );
};

Container.defaultProps = {
  webCss:
    'html { overflow: hidden; position: fixed; } body { overflow: hidden; position: fixed; }',
};

type Styles = {
  container: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
  },
});

export const MainNavigator = () => {
  return (
    <Container>
      <BottomTabs.Navigator
        initialRouteName={Routes.Bubble}
        tabBarOptions={{
          keyboardHidesTabBar: true,
        }}
        tabBar={(props) => <TabBar {...props} />}>
        <BottomTabs.Screen
          name={Routes.BubbleNavigator}
          component={BubbleNavigator}
        />
        <BottomTabs.Screen
          name={Routes.ProfileNavigator}
          component={ProfileNavigator}
        />
      </BottomTabs.Navigator>
    </Container>
  );
};
