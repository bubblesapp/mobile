import React from 'react';
import NativeLottieView from 'lottie-react-native';
import assets from '../../assets';

type Props = {
  speed: number;
};

export const BubbleAnimation: React.FC<Props> = ({speed}) => {
  return (
    <NativeLottieView
      autoPlay={true}
      loop={true}
      source={assets.animations.bubble}
      speed={speed}
    />
  );
};

BubbleAnimation.defaultProps = {
  speed: 1,
};
