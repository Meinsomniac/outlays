import {useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';

export function useSpinAnimation({value, inputRange, outputRange, reversible}) {
  //Local State to manage reverse animation
  const [isStarted, setIsStarted] = useState(false);
  //Create a ref for animation value
  const animationRef = useRef(new Animated.Value(value)).current;

  //Convert the value of animation according to the requirement using interpolate
  const animationValue = animationRef.interpolate({
    inputRange: inputRange || [0, 1],
    outputRange: outputRange || ['0deg', '180deg'],
  });

  //function to start the animation
  function startAnimation(funcVal) {
    !reversible && animationRef.resetAnimation();
    Animated.spring(animationRef, {
      toValue: reversible ? (isStarted ? 0 : funcVal || 1) : funcVal,
      useNativeDriver: true,
    }).start();
    setIsStarted(prev => !prev);
  }

  return [animationValue, startAnimation];
}
