import React, { useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Button,
  CheckIcon,
  FormControl,
  Heading,
  Input,
  ScrollView,
  Select,
  Text,
  View,
  VStack,
} from 'native-base';
import RNDateTimePicker from '@react-native-community/datetimepicker';

import useStore, { useAppointment, useDoctors } from 'store';

type Props = {};

const NewAppt = ({ navigation }: NativeStackScreenProps<Props>) => {
  const user = useStore(state => state.user);
  const doctors = useDoctors(state => state.doctors);
  const createAppointment = useAppointment(state => state.create);

  const [reason, setReason] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const createAppt = () => {
    createAppointment({
      user: user?.id,
      reason,
      doctorId: doctor?.id,
      doctorName: doctor?.name,
      date,
      time,
    });
    navigation.pop();
  };

  return (
    <View borderTopRadius={16} bg="white" p="3">
      <ScrollView>
        <VStack space={3} mt="5">
          <Heading size={'md'} textAlign={'center'}>
            Consult Doctor
          </Heading>
          <FormControl>
            <FormControl.Label>Reason</FormControl.Label>
            <Input
              placeholder="Enter the reason for appointment"
              variant="underlined"
              borderBottomColor={'gray.400'}
              fontSize={'sm'}
              value={reason}
              onChangeText={setReason}
            />
            <FormControl.Label mt={'5'}>Doctor</FormControl.Label>

            <Select
              selectedValue={doctor?.name}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => {
                const parsed = doctors?.find(d => d.id === itemValue);
                setDoctor(parsed);
              }}>
              {doctors?.map?.(doc => {
                return (
                  <Select.Item
                    label={doc?._data?.name}
                    value={doc?._data?.id}
                  />
                );
              })}
            </Select>

            <RNDateTimePicker value={new Date()} onChange={() => {}} />
            <FormControl.Label mt={'5'}>Date</FormControl.Label>
            <Input
              variant="underlined"
              borderBottomColor={'gray.400'}
              placeholder="Select date"
              fontSize={'sm'}
              value={date}
              onChangeText={setDate}
            />

            <FormControl.Label mt={5}>Time</FormControl.Label>
            <Input
              variant="underlined"
              borderBottomColor={'gray.400'}
              placeholder="Select time"
              fontSize={'sm'}
              value={time}
              onChangeText={setTime}
            />
          </FormControl>
        </VStack>
        <Button onPress={createAppt} mt="5" variant={'solid'} rounded={'lg'}>
          <Text color={'white'} fontWeight={'bold'}>
            Consult Doctor
          </Text>
        </Button>
        <Button
          onPress={() => navigation.pop()}
          mt="4"
          variant={'outline'}
          rounded={'lg'}
          borderColor="blue.700">
          Cancel
        </Button>
      </ScrollView>
    </View>
  );
};

export default NewAppt;
