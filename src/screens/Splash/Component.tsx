import React from 'react';
import AnimatedLottieView from 'lottie-react-native';

const Splash = () => {
  return (
    <AnimatedLottieView
      source={require('assets/animation/anim4.json')}
      autoPlay
      loop
    />
  );
};

export default Splash;
