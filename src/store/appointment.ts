import firestore from '@react-native-firebase/firestore';
import { Collections } from 'config/constants';
import create, { SetState, GetState } from 'zustand';

export const useAppointment = create(
  (set: SetState<any>, get: GetState<any>) => ({
    appts: [],
    doctorAppts: [],
    create: async ({ user, doctorId, doctorName, date, time, reason }) => {
      const apptCollection = firestore().collection(Collections.Appointment);

      await apptCollection.add({
        user,
        reason,
        doctorId,
        doctorName,
        date,
        time,
        isDone: false,
      });
    },
    getAppts: async ({ user }) => {
      try {
        set({ isFetching: true });
        const apptCollection = firestore().collection(Collections.Appointment);
        const appts = await apptCollection.where('user', '==', user).get();
        const doctorAppts = await apptCollection
          .where('doctorId', '==', user)
          .get();

        set({
          appts: appts?.docs ?? [],
          doctorAppts: doctorAppts?.docs ?? [],
          isFetching: false,
        });
      } catch (err) {
        console.log('##ERR', err.message);
      }
    },
  }),
);
