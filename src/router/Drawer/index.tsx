import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

//screen
import Transaction from '@screens/Transaction';
import CustomDrawerContent from '@widgets/CustomDrawer';
import Dashboard from '@screens/Dashboard';

const DrawerNavigator = createDrawerNavigator();

const Drawer = () => {
  return (
    <DrawerNavigator.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <DrawerNavigator.Screen name={'Feed'} component={Dashboard} />
      <DrawerNavigator.Screen name="Article" component={Transaction} />
    </DrawerNavigator.Navigator>
  );
};

export default Drawer;
