import React, { useState } from 'react';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import AnimatedLottieView from 'lottie-react-native';
import useStore from 'store/index';
import {
  Box,
  View,
  Text,
  Flex,
  Button,
  Heading,
  Center,
  Image,
  Pressable,
  VStack,
  FormControl,
  Input,
  HStack,
  Link,
  ScrollView,
  KeyboardAvoidingView,
  Spinner,
} from 'native-base';
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Scales } from '@theme';
import { Screens } from 'config/constants';

const PressableEffect = ({ children, ...restProps }: any) => (
  <TouchableOpacity {...restProps}>{children}</TouchableOpacity>
);

const SignIn = ({ navigation }) => {
  const signIn = useStore(state => state.signIn);

  const [isRegisterFlow, setIsRegisterFlow] = useState(false);

  const login = async () => {
    const isNewUser = await signIn();
    console.log('####isNewUser', isNewUser);

    if (isNewUser) {
      navigation.navigate(Screens.Register);
    }
  };

  return (
    <View flex={1} bgColor={'#1b2732'}>
      <Flex>
        <Center mt={'5'} mb={'10'}>
          <Heading
            _light={{
              color: 'white',
            }}
            mb={'5'}>
            Welcome to Life-Care
          </Heading>
          <Image
            source={require('../../../assets/images/doctor_icon.png')}
            alt={'Welcome'}
            rounded={'full'}
            borderRadius={'100'}
            size={'xl'}
            resizeMode={'contain'}
            bgColor={'white'}
          />
        </Center>
      </Flex>
      <Flex flex={1} bgColor={'white'} borderTopRadius={'3xl'} pt={'5'}>
        <ScrollView flex={1}>
          <Center w="100%">
            <Box safeArea p="2" w="100%" maxW="290" py="8">
              <Heading
                size="lg"
                color="coolGray.800"
                textAlign={'center'}
                _dark={{
                  color: 'warmGray.50',
                }}
                fontWeight="semibold">
                {isRegisterFlow ? 'Create Account' : 'LOGIN'}
              </Heading>

              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>Username</FormControl.Label>
                  <Input
                    placeholder="Enter your Username"
                    variant="underlined"
                    borderBottomColor={'gray.400'}
                    fontSize={'sm'}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                    variant="underlined"
                    placeholder="Enter your password"
                    type="password"
                    borderBottomColor={'gray.400'}
                    fontSize={'sm'}
                  />
                </FormControl>
                {isRegisterFlow && (
                  <FormControl>
                    <FormControl.Label>Confirm Password</FormControl.Label>
                    <Input
                      variant="underlined"
                      placeholder="Enter your confirm password"
                      type="password"
                      borderBottomColor={'gray.400'}
                      fontSize={'sm'}
                    />
                  </FormControl>
                )}

                <Button mt="2" colorScheme={'primary'}>
                  {!isRegisterFlow ? 'Login' : 'Register'}
                </Button>
              </VStack>
              <HStack mt="1" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="black"
                  _dark={{
                    color: 'warmGray.200',
                  }}>
                  {isRegisterFlow
                    ? "I'm already have account "
                    : "I'm a new user "}
                </Text>
                <Pressable
                  onPress={() => {
                    setIsRegisterFlow(!isRegisterFlow);
                  }}>
                  <Text color={'primary.700'}>
                    {!isRegisterFlow ? 'Create Account' : 'Login'}
                  </Text>
                </Pressable>
              </HStack>

              {!isRegisterFlow && (
                <>
                  <Text textAlign={'center'} mt={'4'}>
                    (or)
                  </Text>

                  <View mt={'5'}>
                    <GoogleSigninButton
                      size={GoogleSigninButton.Size.Wide}
                      color={GoogleSigninButton.Color.Light}
                      onPress={login}
                      style={{
                        width: '100%',
                      }}
                    />
                  </View>
                </>
              )}
            </Box>
          </Center>
        </ScrollView>
      </Flex>
    </View>
  );
};

export default SignIn;
