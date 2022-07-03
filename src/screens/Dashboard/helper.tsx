import React from 'react';
import { HealthStatus } from './constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

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

export const getTodaysAppts = (appts = []) => {
  const pending = appts?.filter(ap => {
    const isValid = moment(ap?._data?.date).isValid();
    const isToday = ap?._data?.date === moment().format('DD/MM/YYYY');
    const isPending = !ap?._data?.isDone;
    return isValid && isToday && isPending;
  });

  return {
    pending: pending.length,
  };
};

export const howMuchCaloriesPerDay = (weight = 50, height = 150, age = 25) => {
  const w = parseInt(weight, 10);
  const h = parseInt(height, 10);
  const a = parseInt(age, 10);
  return 66 + 6.2 * w + 12.7 * h - 6.76 * a;
};
