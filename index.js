import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from '@router/App';
import { name as appName } from './app.json';
// import messaging from '@react-native-firebase/messaging';
// import { useNotification } from 'store/notification';

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   useNotification.getState().show({
//     title: remoteMessage.notification?.title,
//     body: remoteMessage.notification?.body,
//     id: remoteMessage.messageId,
//   });
// });

AppRegistry.registerComponent(appName, () => App);
