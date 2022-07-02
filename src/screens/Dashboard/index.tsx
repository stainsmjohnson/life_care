import {} from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useStore, { useTransaction } from 'store/index';

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
  VStack,
} from 'native-base';
import { HealthStatus } from './constants';
import { getScreenContent } from './helper';

type Props = {};

const Dashboard = ({ navigation }: NativeStackScreenProps<Props>) => {
  const transactions = useTransaction(state => state.data);
  const addTrans = useTransaction(state => state.create);
  const remTrans = useTransaction(state => state.delete);
  const getAllTrans = useTransaction(state => state.get);
  const showNotification = useNotification(state => state.show);
  const user = useStore(state => state.user);

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
  }, []);
  //checkcircle
  //escalator-warning
  const { colors } = useTheme();

  const content = getScreenContent(status);

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
          Hello {user?.displayName},
        </Heading>
        <Text p="3">{content.desc}</Text>

        <Center>
          <Center
            // bg="primary.400"
            _text={{
              color: 'white',
              fontWeight: 'bold',
            }}
            height={200}
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
            <Box flex={2} bg="red.100" rounded="xl" p="3">
              <Heading>Today</Heading>
              <Text>No Due</Text>
            </Box>
            <Box flex={1} bg="red.100" p="3" rounded="xl" ml={5}>
              <Text>New Appointment</Text>
            </Box>
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
