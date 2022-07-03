import Config from 'react-native-config';
import { Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
const { width, height } = Dimensions.get('screen');

export const Navigators = {
  Drawer: 'Drawer',
};

export const deepurl = React.createRef();

export enum Screens {
  Splash = 'Splash',
  SignIn = 'SignIn',
  OnBoarding = 'OnBoarding',
  Register = 'Register',
  NewAppot = 'NewAppt',
  Dashboard = 'Dashboard',
  UserAppointment = 'Appointments',
  Profile = 'Profile',
}

export enum Collections {
  Appointment = 'Appointment',
  Hospitals = 'Hospitals',
  Users = 'Users',
}

export const API_URL = Config.API_URL;

type ENV_TYPE = 'Development' | 'Staging' | 'Production';

export enum SCREEN {
  HEIGHT = height,
  WIDTH = width,
}

export enum CONVERTER {
  BYTE_TO_KILOBYTE = 0.000976563,
}

export const FIREBASE_CLIENT_ID =
  '42659512177-smga403j9judbdk9pt764sd5c9poakeo.apps.googleusercontent.com';

export const nativeBaseConfig = {
  dependencies: {
    'linear-gradient': LinearGradient,
  },
};
