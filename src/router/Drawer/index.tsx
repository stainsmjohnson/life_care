import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

//screen
import UserAppointments from '@screens/UserAppointments';
import CustomDrawerContent from '@widgets/CustomDrawer';
import Dashboard from '@screens/Dashboard';
import Profile from '@screens/Profile';
import { Screens } from 'config/constants';

const DrawerNavigator = createDrawerNavigator();

const Drawer = () => {
  return (
    <DrawerNavigator.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <DrawerNavigator.Screen name={Screens.Dashboard} component={Dashboard} />
      <DrawerNavigator.Screen name={Screens.Profile} component={Profile} />
      <DrawerNavigator.Screen
        name={Screens.UserAppointment}
        component={UserAppointments}
      />
    </DrawerNavigator.Navigator>
  );
};

export default Drawer;
