import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import create, { SetState, GetState } from 'zustand';

type NotifieObj = {
  id: string | undefined;
  title: string | undefined;
  body: string | undefined;
  icon?: string;
};

const showNotification = async ({ title, body, icon, id }: NotifieObj) => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.requestPermission();

  await notifee.displayNotification({
    id,
    title,
    body,
    android: {
      channelId,
    },
  });
};

export const useNotification = create(
  (set: SetState<any>, get: GetState<any>) => ({
    channelId: null,
    notificationId: null,
    token: null,

    initFCM: () => {
      messaging()
        .registerDeviceForRemoteMessages()
        .then(() => {
          messaging()
            .getToken()
            .then(token => {
              console.log('##FCM TOKEN: ', token);
              set({ token });
            });
        });

      const unsubscribe = messaging().onMessage(async remoteMessage => {
        showNotification({
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          id: remoteMessage.messageId,
        });
      });

      return unsubscribe;
    },

    show: showNotification,

    cancel: async (id: string) => {
      await notifee.cancelNotification(id);
    },
  }),
);
