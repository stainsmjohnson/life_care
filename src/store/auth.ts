import { StoreSlice } from './types';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { FIREBASE_CLIENT_ID } from 'config/constants';

interface AuthState {
  user: FirebaseAuthTypes.User | null;
  initilizing: boolean;
}

interface AuthActions {
  init: () => () => void;
  signIn: () => void;
  signOut: () => void;
}

const authSlice: StoreSlice<AuthState, AuthActions> = (set, get) => ({
  user: null,
  initilizing: true,

  init: () => {
    GoogleSignin.configure({
      webClientId: FIREBASE_CLIENT_ID,
    });
    const subscription = auth().onAuthStateChanged(currentUser => {
      set({ user: currentUser, initilizing: false });
    });
    return subscription;
  },

  signIn: async () => {
    try {
      set({ initilizing: true });
      const { idToken } = await GoogleSignin.signIn();
      if (!idToken) {
        throw new Error('Invalid idToken');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      set({ initilizing: false });
    } catch (err: any) {
      console.warn('Google Signin Error', err.message, err.code);
    }
  },
  signOut: async () => {
    await GoogleSignin.signOut();
    // await GoogleSignin.revokeAccess();
    await auth().signOut();
    console.log('User signed out!');
  },
});

export default authSlice;
