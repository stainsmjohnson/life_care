import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  useColorModeValue,
  View,
  VStack,
} from 'native-base';
import { SceneMap, TabView } from 'react-native-tab-view';
import { Animated, Dimensions } from 'react-native';
import useStore from 'store';

const RegisterForm = () => {
  return <Text>RegisterForm</Text>;
};

const DoctorForm = () => {
  const register = useStore(state => state.register);
  const user = useStore(state => state.user);

  const [name, setName] = useState(user?.displayName ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [dob, setDob] = useState('');
  const [hospital, setHospital] = useState('');

  const registerUser = () => {
    register({
      name,
      email,
      isDoctor: true,
      hospital,
      phone,
    });
  };

  return (
    <ScrollView>
      <Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <Heading
            size="lg"
            color="coolGray.800"
            textAlign={'center'}
            _dark={{
              color: 'warmGray.50',
              // textAlign: 'center',
            }}
            fontWeight="semibold">
            Sign up to continue!
          </Heading>
          {/* <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: 'warmGray.200',
          }}
          fontWeight="medium"
          size="xs">
          Sign up to continue!
        </Heading> */}

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                placeholder="Enter your Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Date Of Birth</FormControl.Label>
              <Input
                placeholder="DD/MM/YYYY"
                value={dob}
                onChangeText={setDob}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Weight</FormControl.Label>
              <Input
                keyboardType="number-pad"
                placeholder="Enter your weight"
                value={weight}
                onChangeText={setWeight}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Height</FormControl.Label>
              <Input
                keyboardType="decimal-pad"
                placeholder="Enter your Height"
                value={height}
                onChangeText={setHeight}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Working Hospital (If any)</FormControl.Label>
              <Input
                placeholder="Enter Working Hospital / Clinic"
                value={hospital}
                onChangeText={setHospital}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Contact</FormControl.Label>
              <Input
                keyboardType="number-pad"
                placeholder="Enter your Contact"
                maxLength={10}
              />
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={registerUser}>
              Save Details
            </Button>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};

const UserForm = () => {
  const register = useStore(state => state.register);
  const user = useStore(state => state.user);

  const [name, setName] = useState(user?.displayName ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [dob, setDob] = useState('');

  const registerUser = () => {
    register({
      name,
      email,
      isDoctor: false,
      phone,
    });
  };

  return (
    <ScrollView>
      <Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <Heading
            size="lg"
            color="coolGray.800"
            textAlign={'center'}
            _dark={{
              color: 'warmGray.50',
              // textAlign: 'center',
            }}
            fontWeight="semibold">
            Sign up to continue!
          </Heading>
          {/* <Heading
            mt="1"
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}
            fontWeight="medium"
            size="xs">
            Sign up to continue!
          </Heading> */}

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                placeholder="Enter your Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Date Of Birth</FormControl.Label>
              <Input
                placeholder="DD/MM/YYYY"
                value={dob}
                onChangeText={setDob}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Weight</FormControl.Label>
              <Input
                keyboardType="number-pad"
                placeholder="Enter your weight"
                value={weight}
                onChangeText={setWeight}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Height</FormControl.Label>
              <Input
                keyboardType="decimal-pad"
                placeholder="Enter your Height"
                value={height}
                onChangeText={setHeight}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Contact</FormControl.Label>
              <Input
                keyboardType="number-pad"
                placeholder="Enter your Contact"
                maxLength={10}
                value={phone}
                onChangeText={setPhone}
              />
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={registerUser}>
              Save Details
            </Button>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};

const Register = () => {
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    {
      key: 'doctor',
      title: 'Doctor',
    },
    {
      key: 'user',
      title: 'User',
    },
  ]);

  const renderTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <Box flexDirection="row">
        {console.log(
          'props.navigationState.routes',
          props.navigationState.routes,
          props.position,
        )}
        {props.navigationState.routes.map((route: any, i: number) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: number) =>
              inputIndex === i ? 1 : 0.5,
            ),
          });
          const color =
            index === i
              ? useColorModeValue('#000', '#e5e5e5')
              : useColorModeValue('#1f2937', '#a1a1aa');
          const borderColor =
            index === i
              ? 'cyan.500'
              : useColorModeValue('coolGray.200', 'gray.400');
          return (
            <Box
              key={i}
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3">
              <Pressable
                onPress={() => {
                  console.log(i);
                  setIndex(i);
                }}>
                <Animated.Text
                  style={{
                    color,
                  }}>
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  const initialLayout = {
    width: Dimensions.get('window').width,
  };

  const renderScene = SceneMap({
    doctor: DoctorForm,
    user: UserForm,
  });

  return (
    <View flex={1}>
      <TabView
        navigationState={{
          index,
          routes,
        }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        // style={{
        //   marginTop: 50,
        // }}
      />
    </View>
  );
};

export default Register;
