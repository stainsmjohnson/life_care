import firestore from '@react-native-firebase/firestore';
import create, { SetState, GetState } from 'zustand';

export const useDoctors = create((set: SetState<any>, get: GetState<any>) => ({
  doctors: [],

  getDoctors: async () => {
    try {
      set({ isFetching: true });
      const doctorCollection = firestore().collection('Users');
      const doctors = await doctorCollection
        .where('isDoctor', '==', true)
        .get();

      console.log('$$ ', doctors.docs);

      set({ doctors: doctors.docs ?? [], isFetching: false });
    } catch (err) {
      console.log('##ERR', err.message);
    }
  },
}));
