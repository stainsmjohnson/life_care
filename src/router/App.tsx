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
import useStore from 'store/index';
import { useNotification } from 'store/notification';
import { NativeBaseProvider } from 'native-base';

const App = () => {
  const init = useStore(state => state.init);
  const initFCM = useNotification(state => state.initFCM);
  const isDarkMode = useColorScheme() === 'dark';

  React.useEffect(() => {
    const remove = init();
    const removeFCM = initFCM();

    return () => {
      remove();
      removeFCM();
    };
  }, []);

  const getInitialURL = async (): Promise<string | null | undefined> => {
    const url = await Linking.getInitialURL();
    return url;
  };

  const deeplinkSubscription = () => {};

  const linking: LinkingOptions<ReactNavigation.RootParamList> = {
    prefixes: [],
    config: deeplinkConfig,
    getInitialURL,
    subscribe: deeplinkSubscription,
  };

  return (
    <NativeBaseProvider>
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
