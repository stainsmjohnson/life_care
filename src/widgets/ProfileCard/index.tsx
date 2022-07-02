import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { useAuth } from 'store/hooks';
import { useDrawerProgress } from '@react-navigation/drawer';
import Animated, {
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';
import useStore from 'store/index';

const ProfileCard = () => {
  const { user } = useStore();
  const progress = useDrawerProgress();

  const animatedCoverStyles = useAnimatedStyle(() => {
    const translateY = interpolate(progress.value, [0, 1], [-100, 0]);
    return { transform: [{ translateY }] };
  });

  const animatedImageStyles = useAnimatedStyle(() => {
    const translateY = interpolate(progress.value, [0, 1], [-360, 0]);
    return { transform: [{ translateY }] };
  });

  return (
    <View>
      <Animated.View style={[styles.cover, animatedCoverStyles]}>
        <View style={styles.profileWrapper}>
          <Animated.View style={[styles.profile, animatedImageStyles]}>
            <Image
              source={{
                uri: user?.photoURL,
              }}
              style={styles.profileImage}
            />
          </Animated.View>
        </View>
      </Animated.View>

      <View style={{ width: '100%', height: 100 }} />
      <Text>{user?.name}</Text>
      <Text>{user?.email}</Text>
      <Text>{user?.phoneNumber}</Text>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  cover: {
    width: '100%',
    height: 100,
    backgroundColor: 'lightblue',
  },
  profileWrapper: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 500,
    top: '50%',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 500,
  },
});
