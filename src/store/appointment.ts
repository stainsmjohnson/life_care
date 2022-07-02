import firestore from '@react-native-firebase/firestore';
import { Collections } from 'config/constants';
import create, { SetState, GetState } from 'zustand';

export const useAppointment = create(
  (set: SetState<any>, get: GetState<any>) => ({
    appts: [],
    create: async ({ user, doctor, date, time, reason }) => {
      const apptCollection = firestore().collection(Collections.Appointment);

      await apptCollection.add({
        user,
        reason,
        doctor,
        date,
        time,
        isDone: false,
      });
    },
    getAppts: async () => {
      try {
        set({ isFetching: true });
        const apptCollection = firestore().collection(Collections.Appointment);
        //   const appts = await apptCollection.where('isDoctor', '==', true).get();
        const appts = [];

        set({ appts: appts ?? [], isFetching: false });
      } catch (err) {
        console.log('##ERR', err.message);
      }
    },
  }),
);
