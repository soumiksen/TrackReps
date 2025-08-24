import { format, startOfWeek } from 'date-fns';
import {
  createUserWithEmailAndPassword,
  signOut as logOut,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
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
    const monday = startOfWeek(new Date(), { weekStartsOn: 1 });
    const firestoreDate = format(monday, 'yyyy-MM-dd');

    const u = await createUserWithEmailAndPassword(auth, email, password);
    const updatedU = await updateProfile(u.user, { displayName: firstName });
    const memberRef = await setDoc(doc(db, 'members', u.user.uid), {
      firstName,
      lastName,
      email,
      repsCompletedInMonth: 0,
      totalRepsCompleted: 0,
      weightLiftedInMonth: 0,
      totalWeightLifted: 0,
      timeExercisedInMonth: 0,
      totalTimeExercised: 0,
      caloriesBurnedInMonth: 0,
      totalCaloriesBurned: 0,
      totalWorkoutsCompleted: 0,
      streak: 0,
      weekStart: firestoreDate,
      weeklyReps: [0, 0, 0, 0, 0, 0, 0],
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

const getUser = async (uid: string) => {
  const memberRef = doc(db, 'members', uid);
  const memberSnapshot = await getDoc(memberRef);
  return memberSnapshot.data();
};

export { getUser, signIn, signOut, signUp };
