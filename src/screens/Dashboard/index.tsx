import { View, Text, Button } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTransaction } from 'store/index';

import { useNotification } from 'store/notification';

type Props = {};

const Dashboard = ({ navigation }: NativeStackScreenProps<Props>) => {
  const transactions = useTransaction(state => state.data);
  const addTrans = useTransaction(state => state.create);
  const remTrans = useTransaction(state => state.delete);
  const getAllTrans = useTransaction(state => state.get);
  const showNotification = useNotification(state => state.show);

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

  return (
    <View>
      <Text>Dashboard</Text>
      <Button title="SHOW NOT" onPress={onDisplayNotification} />
      <Button title="ADD" onPress={addTrans} />
      {transactions?.map(tran => {
        return (
          <View
            key={tran.id}
            style={{
              borderWidth: 2,
              margin: 8,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text>{tran.title}</Text>
            <Button title="X" onPress={() => remTrans(tran.id)} />
          </View>
        );
      })}
    </View>
  );
};

export default Dashboard;
