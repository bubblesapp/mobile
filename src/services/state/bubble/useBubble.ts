import {useContext} from 'react';
import {BubbleState} from './Bubble';
import {BubbleContext} from './BubbleStateProvider';

export const useBubble = () => {
  const context = useContext<BubbleState>(BubbleContext);
  if (!context) {
    throw new Error('useBubble must be used within an BubbleStateProvider');
  }
  return context;
};
