import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Badge, Button, Container, Content, Icon, Text} from 'native-base';
import {PopButton} from './PopButton';
import {FriendList} from './FriendList';
import {CompositeNavigationProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../nav/Routes';
import {BubbleNavigatorNavigationProp, BubbleStackParamsList,} from './BubbleNavigator';
import I18n from '../../i18n';
import {useAPI} from '../../api/useAPI';
import {useAuth} from '../../auth/Auth';
import {Bubble as BubbleModel} from '../../models/Bubble';
import {Popped} from './Popped';

export type BubbleNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BubbleStackParamsList, Routes.Bubble>,
  BubbleNavigatorNavigationProp
>;

export const Bubble: React.FC = () => {
  const navigation = useNavigation<BubbleNavigationProp>();

  const [incomingInvitesCount, setIncomingInvitesCount] = useState<number>(0);
  const [bubble, setBubble] = useState<BubbleModel | undefined>();
  const auth = useAuth();
  const api = useAPI();

  useEffect(() => {
    if (auth.state?.uid) {
      const bubbleSubscription = api
        .observeBubble(auth.state?.uid)
        .subscribe((bu) => {
          console.log('bubble', bu);
          setBubble(bu);
        });
      return () => bubbleSubscription.unsubscribe();
    }
  }, [auth, api]);

  useEffect(() => {
    const invitesSubscription = api.observeIncomingInvites().subscribe({
      next: (value) => setIncomingInvitesCount(value.length),
    });
    return () => invitesSubscription.unsubscribe();
  }, [api]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: I18n.t('bubble.title'),
      headerRight: () =>
        bubble?.isPopped ? null : (
          <Button
            testID={'newInviteButton'}
            accessibilityLabel={'New Invite'}
            style={{paddingRight: 0}}
            badge={incomingInvitesCount > 0}
            transparent
            onPress={() => {
              navigation.navigate(Routes.Invites);
            }}>
            <Icon
              name={'user-plus'}
              type={'FontAwesome5'}
              style={{textAlign: 'right'}}
            />
            {incomingInvitesCount > 0 ? (
              <Badge style={{position: 'absolute', top: 4, right: 8, transform:[{scaleX: 0.8}, {scaleY: 0.8}]}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {incomingInvitesCount}
                </Text>
              </Badge>
            ) : null}
          </Button>
        ),
    });
  }, [navigation, incomingInvitesCount, bubble]);

  return (
    <Container>
      <Content padder accessible={false}>
        {bubble?.isPopped ? (
          <Popped />
        ) : (
          <>
            <PopButton />
            <FriendList />
          </>
        )}
      </Content>
    </Container>
  );
};
