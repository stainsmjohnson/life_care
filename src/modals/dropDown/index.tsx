import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, Input, View, VStack } from 'native-base';
import { ListRenderItem } from 'react-native';

type Props = {};

const NewAppt = ({ navigation }: NativeStackScreenProps<Props>) => {
  const [term, setTerm] = useState('');
  const [data, setData] = useState([]);

  const _renderItem: ListRenderItem<any> = ({ item }) => {
    return <View />;
  };

  return (
    <View borderTopRadius={16} bg="warmGray.300" p="3">
      <VStack space={3} mt="5">
        <Input
          placeholder="Enter the reason for appointment"
          variant="underlined"
          borderBottomColor={'gray.400'}
          fontSize={'sm'}
          value={term}
          onChangeText={setTerm}
        />
        <FlatList data={data} renderItem={_renderItem} />
      </VStack>
    </View>
  );
};

export default NewAppt;
