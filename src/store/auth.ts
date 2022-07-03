import { StoreSlice } from './types';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { FIREBASE_CLIENT_ID } from 'config/constants';
import firestore from '@react-native-firebase/firestore';

GoogleSignin.configure({
  webClientId: FIREBASE_CLIENT_ID,
});
interface AuthState {
  user: FirebaseAuthTypes.User | null;
  initilizing: boolean;
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

  signIn: async () => {
    try {
      const usersCollection = firestore().collection('Users');
      set({ initilizing: true });
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
        email:user.user.email,
        name: user.user.displayName
      };

      if (!userDetails.exists) {
        const isNewUser = true;
        set({ user: { ...user.user, ...userBasicDetails }, initilizing: true });
        return isNewUser;
      } else {
        set({
          initilizing: false,
          user: {
            ...user.user,
            ...userBasicDetails,
            ...userDetails.data(),
          },
        });
      }
    } catch (err: any) {
      console.warn('Google Signin Error', err.message, err.code);
    }
  },

  register: async ({
    name,
    email,
    isDoctor = false,
    hospital = null,
    rating = null,
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
    set({ initilizing: false, user: null });
    console.log('User signed out!');
  },
});

export default authSlice;
