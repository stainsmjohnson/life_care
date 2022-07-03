import { View } from 'react-native';
import React from 'react';
import { Avatar, Box, Heading } from 'native-base';
import useStore from 'store';
import { Text } from 'react-native-svg';

const Profile = () => {
  const user = useStore(state => state.user);
  return (
    <View>
      <Box
        bg={{
          linearGradient: {
            colors: ['lightBlue.300', 'violet.800'],
            start: [0, 0],
            end: [1, 0],
          },
        }}
        p="12"
        rounded="xl"
        alignItems={'center'}
        _text={{
          fontSize: 'md',
          fontWeight: 'medium',
          color: 'warmGray.50',
          textAlign: 'center',
        }}>
        <Avatar
          bg="purple.600"
          alignSelf="center"
          size="2xl"
          source={{
            uri: user?.photoURL,
          }}>
          XX
        </Avatar>
        <Heading mt="10">{user?.name}</Heading>
        <Heading size={'sm'}>{user?.email}</Heading>
      </Box>
      <Box alignItems={'center'} mt="20">
        <Heading size={'sm'}>{'Blood group:  A+'}</Heading>
        <Heading size={'sm'} mt="5">
          {'Phone:  +91 9655 676767'}
        </Heading>
        <Heading mt="5" size={'xs'}>
          {' '}
          {'9/776, Kammanahalli, Banglore'}
        </Heading>
      </Box>
    </View>
  );
};

export default Profile;
