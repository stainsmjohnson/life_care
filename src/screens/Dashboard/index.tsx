import {} from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useStore, { useDoctors, useTransaction } from 'store/index';

import YAxisExample from '@widgets/Chart';

import { useNotification } from 'store/notification';
import {
  AspectRatio,
  Box,
  Center,
  Column,
  Flex,
  Heading,
  Row,
  ScrollView,
  Text,
  useTheme,
  View,
  Pressable,
  VStack,
} from 'native-base';
import { HealthStatus } from './constants';
import { getScreenContent } from './helper';
import { Screens } from 'config/constants';

type Props = {};

const Dashboard = ({ navigation }: NativeStackScreenProps<Props>) => {
  const user = useStore(state => state.user);
  const transactions = useTransaction(state => state.data);
  const addTrans = useTransaction(state => state.create);
  const remTrans = useTransaction(state => state.delete);
  const getAllTrans = useTransaction(state => state.get);
  const showNotification = useNotification(state => state.show);
  const getDoctors = useDoctors(state => state.getDoctors);

  const [status, setStatus] = React.useState<HealthStatus>(
    HealthStatus.Excellent,
  );

  async function onDisplayNotification() {
    showNotification({
      title: 'New Notification',
      id: '123',
      body: 'hello world',
    });
  }

  React.useEffect(() => {
    getAllTrans();
    getDoctors();
  }, []);
  //checkcircle
  //escalator-warning
  const { colors } = useTheme();

  const content = getScreenContent(status);

  const createNewAppt = () => {};

  const _renderStatus = () => {
    return (
      <Box
        bg={{
          linearGradient: {
            colors: content.lg,
            start: [0, 0],
            end: [1, 0],
          },
        }}
        _text={{
          fontSize: 'md',
          fontWeight: 'medium',
          color: 'warmGray.50',
          textAlign: 'center',
        }}>
        <Heading p="3" fontSize="xl">
          Hello {user?.name},
        </Heading>

        <Row px={5}>
          <Box flex={1} mr={3} h="100" bg={'violet.800'} rounded="25">
            <Center flex={1}>
              <Heading size={'sm'} color={'amber.200'}>
                Height
              </Heading>
              <Text color={'amber.200'}>190 cm</Text>
            </Center>
          </Box>

          <Box flex={1} mr={3} h="100" bg={'violet.800'} rounded="25">
            <Center flex={1}>
              <Heading size={'sm'} color={'amber.200'}>
                Weight
              </Heading>
              <Text color={'amber.200'}>78 kg</Text>
            </Center>
          </Box>
          <Box flex={1} h="100" bg={'violet.800'} rounded="25">
            <Center flex={1}>
              <Heading size={'sm'} color={'amber.200'}>
                BMI
              </Heading>
              <Text color={'amber.200'}>140</Text>
            </Center>
          </Box>
        </Row>
        <Center>
          <Center
            _text={{
              color: 'white',
              fontWeight: 'bold',
            }}
            pt="5"
            pb="10"
            width={{
              base: 200,
              lg: 250,
            }}>
            {content.icon}
            <Heading size="sm" mt={5}>
              {content.title}
            </Heading>
          </Center>
        </Center>
      </Box>
    );
  };

  return (
    <ScrollView>
      {_renderStatus()}
      <Box bgColor={'white'}>
        <Box
          roundedTop={'2xl'}
          width={'full'}
          h="5"
          position="absolute"
          top="-20"
          bgColor={'white'}
        />
        <Box px="5">
          <Heading>Your Appointments</Heading>
          <Flex direction="row">
            <Pressable
              flex={2}
              bg="red.100"
              rounded="xl"
              p="3"
              onPress={() => navigation.navigate(Screens.UserAppointment)}>
              <Heading size={'md'}>Today</Heading>
              <Text>No Due</Text>
            </Pressable>
            <Pressable
              flex={1}
              bg="red.100"
              p="3"
              rounded="xl"
              ml={5}
              onPress={() => navigation.navigate(Screens.NewAppot)}>
              <Text>New Appointment</Text>
            </Pressable>
          </Flex>
          <Flex direction="row" pt="5">
            <Pressable flex={1.4} bg="red.100" rounded="xl" p="3">
              <Heading size={'sm'}>Calories burnt</Heading>
              <Text>350</Text>
            </Pressable>
            <Pressable
              flex={2}
              bg="red.100"
              p="3"
              rounded="xl"
              ml={5}
              onPress={() => navigation.navigate(Screens.NewAppot)}>
              <Text>You need to burn 327 more calories today</Text>
            </Pressable>
          </Flex>
          <Box flex={1} bg="red.100" px="2" pb={0} rounded="xl" mt={5}>
            <YAxisExample />
          </Box>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default Dashboard;
