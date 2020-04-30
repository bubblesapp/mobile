import React, {useEffect, useState} from 'react';
import {PopButton} from './PopButton';
import {FriendList} from './FriendList';
import {Popped} from './Popped';
import {Bubble as BubbleModel} from '@bubblesapp/api';
import {useAPI} from '../../api/useAPI';
import {ScrollView} from 'react-native';

export const Bubble: React.FC = () => {
  const [bubble, setBubble] = useState<BubbleModel | undefined>();
  const api = useAPI();

  useEffect(() => {
    const bubbleSubscription = api.bubble.observe().subscribe((bu) => {
      setBubble(bu);
    });
    return () => bubbleSubscription.unsubscribe();
  }, [api]);

  return (
    <ScrollView accessible={false}>
      {bubble?.isPopped ? (
        <Popped />
      ) : (
        <>
          <PopButton />
          <FriendList />
        </>
      )}
    </ScrollView>
  );
};
