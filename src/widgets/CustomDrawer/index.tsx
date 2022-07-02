import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  useDrawerProgress,
} from '@react-navigation/drawer';
import ProfileCard from '@widgets/ProfileCard';
import { Screens } from 'config/constants';
import React from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import useStore from 'store/index';
// import { useAuth } from 'store/hooks';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const { signOut } = useStore();
  const progress = useDrawerProgress();

  const animatedCoverStyles = useAnimatedStyle(() => {
    const translateY = interpolate(progress.value, [0, 1], [500, 0], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    const opacity = interpolate(progress.value, [0.5, 1], [0, 1], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    return {
      height: 800,
      opacity,
      transform: [{ translateY }],
    };
  });
  return (
    <DrawerContentScrollView {...props}>
      <ProfileCard />
      <Animated.View style={animatedCoverStyles}>
        <DrawerItemList {...props} />
        <DrawerItem label="Signout" onPress={signOut} />
      </Animated.View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
