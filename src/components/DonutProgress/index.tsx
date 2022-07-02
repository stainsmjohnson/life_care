import React from 'react';
import { Colors } from '@theme';
import Svg, { Path, SvgProps } from 'react-native-svg';
import Animated, {
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
const AnimatedPath = Animated.createAnimatedComponent(Path);

type Methods = {
  show: (progress: number) => void;
};

const DonutProgress: React.ForwardRefRenderFunction<Methods, SvgProps> = (
  props,
  ref,
) => {
  const progressAnimation = useSharedValue(0);
  const MAX = 630;

  React.useImperativeHandle(
    ref,
    () => ({
      show: nextProgress => {
        progressAnimation.value = withSpring(nextProgress);
      },
    }),
    [progressAnimation],
  );

  const animatedProps = useAnimatedProps(() => {
    const p = interpolate(progressAnimation.value, [0, 100], [0, MAX]);
    return {
      strokeDasharray: [p, MAX - p],
    };
  });
  return (
    <Svg viewBox="-50 -50 300 300" {...props}>
      <Path
        strokeDasharray={MAX}
        d={'M 100,100 m -100,0 a 100,100 0 1,0 200,0 a 100,100 0 1,0 -200,0'}
        strokeWidth={15}
        stroke={Colors.ACCENT}
        strokeLinecap="round"
      />
      <AnimatedPath
        animatedProps={animatedProps}
        d={'M 100,100 m -100,0 a 100,100 0 1,0 200,0 a 100,100 0 1,0 -200,0'}
        strokeWidth={15}
        stroke={Colors.PRIMARY}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default React.forwardRef(DonutProgress);
