import { StoreSlice } from './types';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { FIREBASE_CLIENT_ID } from 'config/constants';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure({
  webClientId: FIREBASE_CLIENT_ID,
});
interface AuthState {
  user: FirebaseAuthTypes.User | null;
  initilizing: boolean;
  isFetching: boolean;
}

interface AuthActions {
  init: () => () => void;
  signIn: () => void;
  register: (data: object) => void;
  signOut: () => void;
}

const authSlice: StoreSlice<AuthState, AuthActions> = (set, get) => ({
  user: null,
  initilizing: true,
  isFetching: false,

  signIn: async () => {
    try {
      set({ initilizing: true, isFetching: true });
      const usersCollection = firestore().collection('Users');
      const { idToken } = await GoogleSignin.signIn();
      if (!idToken) {
        throw new Error('Invalid idToken');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const user = await auth().signInWithCredential(googleCredential);

      //check user already there
      const userDetails = await usersCollection.doc(user.user.uid).get();

      console.log('###', userDetails.exists, userDetails.data(), user.user);

      const userBasicDetails = {
        photoURL: user.user.photoURL,
        phoneNumber: user.user.phoneNumber,
        id: user.user.uid,
        email: user.user.email,
        name: user.user.displayName,
      };

      if (!userDetails.exists) {
        const isNewUser = true;
        set({
          user: { ...user.user, ...userBasicDetails },
          initilizing: true,
          isFetching: false,
        });
        return isNewUser;
      } else {
        set({
          initilizing: false,
          isFetching: false,
          user: {
            ...user.user,
            ...userBasicDetails,
            ...userDetails.data(),
          },
        });
        AsyncStorage.setItem('USER', 'true');
      }
    } catch (err: any) {
      console.warn('Google Signin Error', err.message, err.code);
      set({ isFetching: false });
    }
  },

  register: async ({
    name,
    email,
    isDoctor = false,
    hospital = null,
    rating = null,
    weight,
    height,
  }) => {
    try {
      const user = get().user;
      const usersCollection = firestore().collection('Users');
      await usersCollection.doc(user?.id).set({
        name,
        email,
        isDoctor,
        hospital,
        rating,
        id: user?.id,
        weight,
        height,
      });
      set({ user: { ...user, isDoctor, hospital }, initilizing: false });
    } catch (err) {
      console.log('##ERR', err.message);
    }
  },

  signOut: async () => {
    await GoogleSignin.signOut();
    // await GoogleSignin.revokeAccess();
    await auth().signOut();
    AsyncStorage.clear();
    set({ initilizing: false, user: null });
    console.log('User signed out!');
  },

  getCalories: async (token: string) => {
    try {
      const orderCollection = firestore().collection('order');
      const data = await orderCollection.doc(token).get();
      return data.data();
    } catch (err) {
      console.log('##ERR', err.message);
    }
  },
});

export default authSlice;
