import React, {useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {View, ViewStyle} from 'react-native';
import Lottie, {AnimationItem} from 'lottie-web';
import assets from '../../assets';

type Props = {
  speed: number;
  containerStyle: ViewStyle;
};

export const BubbleAnimation: React.FC<Props> = ({speed, containerStyle}) => {
  const containerRef = useRef<View>(null);
  const [loaded, setLoaded] = useState(false);
  const [animation, setAnimation] = useState<AnimationItem>();
  const element = ReactDOM.findDOMNode(containerRef.current) as Element;
  if (!loaded && element) {
    setAnimation(
      Lottie.loadAnimation({
        container: element,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: assets.animations.bubble,
      }),
    );
    setLoaded(true);
  }
  animation?.setSpeed(speed);
  return <View ref={containerRef} style={containerStyle} />;
};

BubbleAnimation.defaultProps = {
  speed: 1,
};
