import React, { useEffect, useState } from 'react';
import {
  Box,
  FlatList,
  HStack,
  Text,
  Spacer,
  Column,
  Button,
} from 'native-base';
import useStore, { useAppointment } from 'store';

const UserAppointments = () => {
  const [isPatientList, setIsPatientList] = useState(false);
  const user = useStore(state => state.user);
  const getAppts = useAppointment(store => store.getAppts);
  const appts = useAppointment(store => store.appts);
  const doctorAppts = useAppointment(store => store.doctorAppts);

  useEffect(() => {
    getAppts({ user: user.id });
  }, []);

  return (
    <FlatList
      ListHeaderComponent={
        user?.isDoctor && (
          <Button onPress={() => setIsPatientList(pre => !pre)}>
            {isPatientList ? 'My Appointments' : 'My Patients'}
          </Button>
        )
      }
      data={isPatientList ? doctorAppts : appts}
      renderItem={({ item }) => {
        return (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: 'muted.50',
            }}
            borderColor="muted.800"
            px="5"
            py="5">
            <HStack space={[2, 3]} justifyContent="space-between">
              <Column>
                <Text
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800"
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
    />
  );
};

export default UserAppointments;
