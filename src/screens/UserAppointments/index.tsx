import React, { useEffect, useState } from 'react';
import {
  Box,
  FlatList,
  HStack,
  Text,
  Spacer,
  Column,
  Button,
  useColorModeValue,
  Pressable,
  View,
} from 'native-base';
import useStore, { useAppointment } from 'store';
import { SceneMap, TabView } from 'react-native-tab-view';
import { Animated, Dimensions } from 'react-native';

const UserAppointments = () => {
  const [isPatientList, setIsPatientList] = useState(false);
  const user = useStore(state => state.user);
  const getAppts = useAppointment(store => store.getAppts);
  const appts = useAppointment(store => store.appts);
  const doctorAppts = useAppointment(store => store.doctorAppts);

  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    {
      key: 'my_appointment',
      title: 'My Appointments',
    },
    {
      key: 'my_patient',
      title: 'My Patients',
    },
  ]);

  useEffect(() => {
    getAppts({ user: user.id });
  }, []);

  const MyAppointment = () => {
    return (
      <FlatList
        // ListHeaderComponent={
        //   user?.isDoctor && (
        //     <Button onPress={() => setIsPatientList(pre => !pre)}>
        //       {isPatientList ? 'My Appointments' : 'My Patients'}
        //     </Button>
        //   )
        // }
        data={isPatientList ? doctorAppts : appts}
        renderItem={({ item }) => {
          return (
            <Box
              // borderBottomWidth="1"
              // _dark={{
              //   borderColor: 'muted.50',
              // }}
              // borderColor="muted.800"
              bgColor={'white'}
              mt={'3'}
              rounded={'2xl'}
              mx={'5'}
              px="5"
              py="5">
              <HStack space={[2, 3]} justifyContent="space-between">
                <Column>
                  <Text
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    color="coolGray.800"
                    fontSize={'md'}
                    bold>
                    {item?._data?.reason}
                  </Text>

                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: 'warmGray.200',
                    }}>
                    {item?._data?.doctorName}
                  </Text>
                </Column>

                <Spacer />
                <Column>
                  <Text
                    fontSize="xs"
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    color="coolGray.800"
                    alignSelf="flex-start">
                    {item?._data?.date}
                  </Text>
                  <Text>{item?._data?.time}</Text>
                </Column>
              </HStack>
            </Box>
          );
        }}
        ListFooterComponent={() => {
          return (
            <Text textAlign={'center'} my={'100'}>
              {isPatientList
                ? !appts.length
                  ? 'No Data Found'
                  : null
                : !doctorAppts.length
                ? 'No Data Found'
                : null}
            </Text>
          );
        }}
      />
    );
  };

  const renderScene = SceneMap({
    my_appointment: MyAppointment,
    my_patient: MyAppointment,
  });

  const initialLayout = {
    width: Dimensions.get('window').width,
  };

  const renderTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <Box flexDirection="row">
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
              bgColor={index === i ? 'primary.600' : 'white'}
              p="3">
              <Pressable
                onPress={() => {
                  console.log(i);
                  setIndex(i);
                  setIsPatientList(
                    route?.key === 'my_appointment' ? false : true,
                  );
                }}>
                <Animated.Text
                  style={{
                    color: index === i ? 'white' : color,
                    fontWeight: 'bold',
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

  return (
    <View bgColor="#f6f5fa" flex={1}>
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

export default UserAppointments;
