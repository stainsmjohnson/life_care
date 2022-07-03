import RootStack from './Root';

import React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
} from '@react-navigation/native';

import deeplinkConfig from 'config/deeplink';
import { Linking, useColorScheme } from 'react-native';

//screens
import Splash from '@screens/Splash';
import { useNotification } from 'store/notification';
import { NativeBaseProvider } from 'native-base';
import { nativeBaseConfig } from 'config/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStore from 'store';

const App = () => {
  const initFCM = useNotification(state => state.initFCM);
  const signIn = useStore(state => state.signIn);
  const isDarkMode = useColorScheme() === 'dark';

  React.useEffect(() => {
    const removeFCM = initFCM();
    AsyncStorage.getItem('USER').then(data => {
      if (data) {
        signIn();
      }
    });
    return () => {
      removeFCM();
    };
  }, []);

  const getInitialURL = async (): Promise<string | null | undefined> => {
    const url = await Linking.getInitialURL();
    return url;
  };

  const deeplinkSubscription = () => {};

  const linking: LinkingOptions<ReactNavigation.RootParamList> = {
    prefixes: ['https://www.lifecare.com', 'http://www.lifecare.com'],
    config: deeplinkConfig,
    getInitialURL,
    subscribe: deeplinkSubscription,
  };

  return (
    <NativeBaseProvider config={nativeBaseConfig}>
      <NavigationContainer
        theme={isDarkMode ? DarkTheme : DefaultTheme}
        linking={linking}
        fallback={<Splash />}>
        <RootStack />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
