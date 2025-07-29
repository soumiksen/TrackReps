import {
  createUserWithEmailAndPassword,
  signOut as logOut,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseconfig';

const signIn = async (email: string, password: string) => {
  try {
    const u = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in successfully: ', u.user.email);
  } catch (error) {
    console.log('Error signin in: ', error);
  }
};

const signUp = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const u = await createUserWithEmailAndPassword(auth, email, password);
    const updatedU = await updateProfile(u.user, { displayName: firstName });
    const memberRef = await setDoc(doc(db, 'members', u.user.uid), {
      firstName,
      lastName,
      email,
    });
    console.log('User signed up successfully:', u.user.email);
  } catch (error) {
    console.log('Error signing up: ', error);
  }
};

const signOut = async () => {
  try {
    const u = await logOut(auth);
  } catch (error) {
    console.log('Error signing out: ', error);
  }
};

export { signIn, signOut, signUp };
