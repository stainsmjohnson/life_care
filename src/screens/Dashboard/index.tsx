import React, { useMemo, useState } from 'react';
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
  Modal,
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
import { deepurl, Screens } from 'config/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome5';

type Props = {};

const getBMIText = (bmiValue: any) => {
  console.log('bmi Values', bmiValue <= 18.4);
  let returnText = '';

  if (bmiValue <= 18.4) {
    returnText = 'Range is below 18.4, which is considered as Underweight';
  } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
    returnText =
      'Range is between 18.5 and 24.9, which is considered as Normal';
  } else if (bmiValue >= 25.0 && bmiValue <= 39.9) {
    returnText =
      'Range is between 25.0 and 39.9, which is considered as OverWeight';
  } else if (bmiValue >= 40.0) {
    returnText = 'Range is above 40.0, which is considered as Obese';
  } else {
    returnText = `Your BMI is ${bmiValue}`;
  }

  return returnText;
};

const Dashboard = ({ navigation }: NativeStackScreenProps<Props>) => {
  const user = useStore(state => state.user);
  const getCalories = useStore(state => state.getCalories);
  const [caloryModal, setCaloryModal] = useState(false);
  const transactions = useTransaction(state => state.data);
  const addTrans = useTransaction(state => state.create);
  const getAppts = useAppointment(store => store.getAppts);
  const appts = useAppointment(store => store.appts);
  const remTrans = useTransaction(state => state.delete);
  const getAllTrans = useTransaction(state => state.get);
  const showNotification = useNotification(state => state.show);
  const getDoctors = useDoctors(state => state.getDoctors);

  const [bmiDetails, setBmiDetails] = useState<any>();

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

  const getTokenDetails = async (token: any) => {
    if (!token) {
      return;
    }
    const cal = await getCalories(token);
    setCaloryModal(cal);
  };

  React.useEffect(() => {
    console.log('####key dd ', deepurl.current);
    if (deepurl.current && typeof deepurl.current === 'string') {
      const token = deepurl.current.split('token=')?.[1];
      getTokenDetails(token);
    }
    getAppts({ user: user.id });
    getAllTrans();
    getDoctors();
    calculateBMIIndex();
  }, []);
  //checkcircle
  //escalator-warning
  const { colors } = useTheme();

  const content = getScreenContent(status);

  const todayAppts = useMemo(() => getTodaysAppts(appts), [appts]);

  const calculateBMIIndex = () => {
    // 39.37
    let bmiIndex = 17;

    if (!!user?.weight && !!user?.height) {
      const height = Number(user.height) * 30.48;
      bmiIndex = (Number(user.weight) / height / height) * 10000;
      // const feet = Math.floor(user.height) / 10.764;
      // console.log(Number(user.weight) / (Number(user.height) / 10.764));
      // bmiIndex = Number(user.weight) / ((Number(user.height) / 39.37) * 2);
      if (bmiIndex) {
        bmiIndex = Number(bmiIndex.toFixed(2));
      }
    }

    if (bmiIndex <= 18.4) {
      setStatus(HealthStatus.Fine);
    } else if (bmiIndex > 18.5 && bmiIndex < 24) {
      setStatus(HealthStatus.Excellent);
    } else {
      setStatus(HealthStatus.Rough);
    }

    // console.log({ bmiIndex, bmiText: getBMIText(Number(bmiIndex)) });

    setBmiDetails({ bmiIndex, bmiText: getBMIText(Number(bmiIndex)) });
  };

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

        <Row px={5} mb={5}>
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
                {user.height ? user.height : '190'} ft
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
                {!!bmiDetails?.bmiIndex ? bmiDetails.bmiIndex : null}
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
                {user.weight ? user.weight : '50'} kg
              </Heading>
              <Text color={'black'}>Weight</Text>
            </Center>
          </Box>
        </Row>
        <View bgColor={'white'} mx={'5'} p="5">
          <Center>
            <Center
              _text={{
                color: 'white',
                fontWeight: 'bold',
              }}
              // pt="5"
              pb="10"
              width={'full'}>
              {content.icon}
              <Heading size="sm" mt={3} width={'full'} textAlign={'center'}>
                {content?.title}
              </Heading>
              {!!bmiDetails?.bmiText && (
                <Text textAlign={'center'}>{bmiDetails.bmiText}</Text>
              )}
            </Center>
          </Center>
        </View>
      </Box>
    );
  };

  const _renderCaloryModal = () => {
    return (
      <Modal
        isOpen={!!caloryModal}
        onClose={() => setCaloryModal(false)}
        size={'md'}>
        <View flex={1} justifyContent={'center'} alignItems={'center'}>
          <View bg={'white'} p="5" rounded={'8'} margin="3" minW={'80%'}>
            <Heading>Your order</Heading>
            <Row borderWidth={1}>
              <Center>{caloryModal?.name}</Center>
              <Center>{caloryModal?.count}</Center>
            </Row>
            <Text>Your order containing {caloryModal?.calories} calories.</Text>
          </View>
        </View>
      </Modal>
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
      {_renderCaloryModal()}
    </ScrollView>
  );
};

export default Dashboard;
