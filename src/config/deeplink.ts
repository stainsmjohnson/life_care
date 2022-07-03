import { PathConfigMap } from '@react-navigation/native';
import { Screens } from './constants';

type Config = {
  screens: PathConfigMap<ReactNavigation.RootParamList>;
};

const config: Config = {
  screens: {
    [Screens.Dashboard]: {
      path: '/:key',
    },
  },
};

export default config;
