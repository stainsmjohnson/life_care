import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import React from 'react';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import AnimatedLottieView from 'lottie-react-native';
import useStore from 'store/index';

const SignIn = ({ navigation }) => {
  const signIn = useStore(state => state.signIn);
  const initilizing = useStore(state => state.initilizing);

  if (initilizing) {
    return <ActivityIndicator animating size="large" />;
  }
  return (
    <View style={styles.screen}>
      <AnimatedLottieView
        source={require('assets/animation/anim4.json')}
        autoPlay
        loop
      />
      <View style={styles.cta}>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={signIn}
          disabled={initilizing}
        />
        <TouchableOpacity onPress={() => navigation.navigate('OnBoarding')}>
          <Text>Let's Get Started!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  screen: { flex: 1 },
  cta: {
    position: 'absolute',
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
