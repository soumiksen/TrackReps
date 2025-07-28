import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebaseconfig';

const signIn = async (email: string, password: string) => {
  try {
    const u = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in successfully: ', u.user.email);
  } catch (error) {
    console.log('Error signin in: ', error);
  }
};

const signUp = async (email: string, password: string) => {
  try {
    const u = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User signed up successfully:', u.user.email);
  } catch (error) {
    console.log('Error signing up:', error);
  }
};

export { signIn, signUp };
