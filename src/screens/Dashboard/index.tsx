import {} from 'react-native';
import React, { useMemo } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useStore, {
  useAppointment,
  useDoctors,
  useTransaction,
} from 'store/index';

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
  // Icon,
} from 'native-base';
import { HealthStatus } from './constants';
import { getScreenContent, getTodaysAppts } from './helper';
import { Screens } from 'config/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome5';

type Props = {};

const Dashboard = ({ navigation, key }: NativeStackScreenProps<Props>) => {
  const user = useStore(state => state.user);
  const transactions = useTransaction(state => state.data);
  const addTrans = useTransaction(state => state.create);
  const getAppts = useAppointment(store => store.getAppts);
  const appts = useAppointment(store => store.appts);
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
    console.log('####key dd ', key);

    getAppts({ user: user.id });
    getAllTrans();
    getDoctors();
  }, []);
  //checkcircle
  //escalator-warning
  const { colors } = useTheme();

  const content = getScreenContent(status);

  const todayAppts = useMemo(() => getTodaysAppts(appts), [appts]);

  const _renderStatus = () => {
    return (
      <Box
        // bg={{
        //   linearGradient: {
        //     colors: content.lg,
        //     start: [0, 0],
        //     end: [1, 0],
        //   },
        // }}
        bgColor={'#f6f5fa'}
        _text={{
          fontSize: 'md',
          fontWeight: 'medium',
          // color: 'warmGray.50',
          textAlign: 'center',
        }}>
        <Heading p="3" fontSize="xl">
          Hi {user?.name},
        </Heading>

        <Row px={5} mb={10}>
          <Box flex={1} mr={3} h="120" bg={'white'} rounded="25">
            <Center flex={1}>
              <Box
                bgColor={'blue.100'}
                rounded={'lg'}
                alignItems={'center'}
                justifyContent={'center'}
                width={7}
                height={7}
                mb={'2'}>
                <MaterialIcons name="height" size={20} color={'blue'} />
              </Box>
              <Heading size={'sm'} color={'black'}>
                190 cm
              </Heading>
              <Text color={'black'}>Height</Text>
            </Center>
          </Box>

          <Box flex={1} mr={3} h="120" bg={'white'} rounded="25">
            <Center flex={1}>
              <Box
                bgColor={'green.200'}
                rounded={'lg'}
                alignItems={'center'}
                justifyContent={'center'}
                width={7}
                height={7}
                mb={'2'}>
                <Icon name="user" size={20} color={'green'} />
              </Box>
              <Heading size={'sm'} color={'black'}>
                18
              </Heading>
              <Text color={'black'}>BMI (Normal)</Text>
            </Center>
          </Box>

          <Box flex={1} mr={3} h="120" bg={'white'} rounded="25">
            <Center flex={1}>
              <Box
                bgColor={'blue.100'}
                rounded={'lg'}
                alignItems={'center'}
                justifyContent={'center'}
                width={7}
                height={7}
                mb={'2'}>
                <Icon name="weight" size={20} color={'blue'} />
              </Box>
              <Heading size={'sm'} color={'black'}>
                50 kg
              </Heading>
              <Text color={'black'}>Weight</Text>
            </Center>
          </Box>
        </Row>
        {/* <Center>
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
        </Center> */}
      </Box>
    );
  };

  return (
    <ScrollView>
      {_renderStatus()}
      <Box>
        <Box
          roundedTop={'2xl'}
          width={'full'}
          h="5"
          position="absolute"
          top="-20"
          bgColor={'#f6f5fa'}
        />
        <Box px="5">
          {/* <Heading>Your Appointments</Heading> */}
          <Flex direction="row">
            <Pressable
              flex={2}
              bg="white"
              rounded="xl"
              p="3"
              onPress={() => navigation.navigate(Screens.UserAppointment)}>
              <Flex flexDirection={'row'} justifyContent={'space-between'}>
                <Heading size={'sm'}>Today</Heading>
                <Icon
                  name="arrow-right"
                  size={15}
                  style={{ marginRight: 5 }}
                  color="black"
                />
              </Flex>

              <Text textAlign={'center'} py={'3'}>
                {todayAppts?.pending === 0
                  ? 'No Upcoming Appointments'
                  : todayAppts?.pending === 1
                  ? '1 Upcoming Appointment'
                  : `${todayAppts?.pending} Upcoming Appointments`}
              </Text>
            </Pressable>
          </Flex>

          <Flex direction="row">
            <Pressable
              flex={2}
              bg="white"
              rounded="xl"
              p="3"
              mt={'5'}
              onPress={() => navigation.navigate(Screens.NewAppot)}>
              <Heading size={'sm'}>Consult Doctor</Heading>
              <Flex
                py={3}
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}>
                <Text textAlign={'left'}>
                  Want to consult with Doctor ? Create an Appointment
                </Text>
                <Icon name="arrow-circle-right" size={30} color="black" />
              </Flex>
            </Pressable>
          </Flex>

          <Flex direction="row" pt="5">
            <Pressable flex={2} bg="white" rounded="xl" p="3">
              <Heading size={'sm'}>Calories burnt</Heading>
              <Text textAlign={'center'} py={'3'}>
                350 Calories Burnt
              </Text>
              <View bgColor={'amber.100'} p={2} rounded={'lg'}>
                <Text textAlign={'center'}>
                  <Icon name="exclamation-circle" size={15} color="black" /> You
                  need to burn 327 more calories today
                </Text>
              </View>
            </Pressable>
            {/* <Pressable
              flex={2}
              bg="rgba(0,0,0,0.1)"
              p="3"
              rounded="xl"
              ml={5}
              onPress={() => navigation.navigate(Screens.NewAppot)}></Pressable> */}
          </Flex>

          <Flex direction="row" mt={5} mb={'10'}>
            <Pressable flex={2} bg="white" rounded="xl" p="3">
              <Heading size={'sm'}>BMI Chart</Heading>
              <Box
                flex={1}
                bg="white"
                px="2"
                pb={0}
                rounded="xl"
                mt={5}
                mb={10}>
                <YAxisExample />
              </Box>
            </Pressable>
          </Flex>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default Dashboard;
