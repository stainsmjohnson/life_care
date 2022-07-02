import React from 'react';
import { HealthStatus } from './constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const getScreenContent = (status: HealthStatus) => {
  const bg = {
    [HealthStatus.Excellent]: {
      lg: ['green.200', 'green.300'],
      title: 'Excellent! Keep rocking :)',
      icon: <AntDesign name="checkcircle" size={30} color="green" />,
      desc: 'Lorem asd as da sd as da sd a sd a sdasd',
    },
    [HealthStatus.Fine]: {
      lg: ['yellow.100', 'yellow.200'],
      title: 'Your health is okay ;)',
      icon: <AntDesign name="escalator-warning" size={30} color="green" />,
      desc: 'Lorem asd as da sd as da sd a sd a sdasd',
    },
    [HealthStatus.Rough]: {
      lg: ['red.100', 'red.300'],
      title: 'Need Attention!',
      icon: <MaterialIcons name="escalator-warning" size={30} color="#900" />,
      desc: 'Lorem asd as da sd as da sd a sd a sdasd',
    },
  };

  return bg[status];
};
