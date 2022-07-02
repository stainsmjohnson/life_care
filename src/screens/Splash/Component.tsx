import React from 'react';
import { Center, Heading } from 'native-base';
import { SafeAreaView } from 'react-native';

const Splash = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Center flex={1}>
        <Heading>Life Care</Heading>
      </Center>
    </SafeAreaView>
  );
};

export default Splash;
