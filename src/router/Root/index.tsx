import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//routers
import Drawer from '@router/Drawer';

//screens
import SignIn from '@screens/SignIn';
import OnBoarding from '@screens/OnBoarding';
import Codepush from '@modals/Codepush';
import { Navigators, Screens } from 'config/constants';
import { StyleSheet } from 'react-native';
import { Colors } from '@theme';
import useStore from 'store/index';
import Register from '@screens/Register';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const user = useStore(state => state.user);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: user ? 'slide_from_right' : 'slide_from_left',
      }}>
      {!user ? (
        <>
          <Stack.Screen name={Screens.SignIn} component={SignIn} />
          <Stack.Screen name={Screens.Register} component={Register} />
        </>
      ) : (
        <Stack.Screen name={Navigators.Drawer} component={Drawer} />
      )}
      <Stack.Screen name={Screens.OnBoarding} component={OnBoarding} />
      {/* <Stack.Group
        screenOptions={{
          presentation: 'transparentModal',
          animation: 'fade_from_bottom',
          contentStyle: styles.modelContainer,
        }}>
      </Stack.Group> */}
    </Stack.Navigator>
  );
};

export default RootStack;

const styles = StyleSheet.create({
  modelContainer: {
    backgroundColor: Colors.TRANSPARENT_BACKGROUND,
    justifyContent: 'flex-end',
  },
});
