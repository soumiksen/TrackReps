import { db } from '@/firebaseconfig';

import { addDoc, collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';

const addWorkout = async (memberId: string, workoutData: any) => {
  try {
    console.log('MEMBER ID: ', memberId)
    const workoutRef = await addDoc(
      collection(db, 'members', memberId, 'workouts'),
      {
        name: workoutData.name,
      }
    );
    const exercises = workoutData.exercises;
    const exercisesCollectionRef = collection(
      db,
      'members',
      memberId,
      'workouts',
      workoutRef.id,
      'exercises'
    );

    const addExercisePromises = exercises.map((exercise: object) =>
      addDoc(exercisesCollectionRef, exercise)
    );

    await Promise.all(addExercisePromises);

    console.log('Workout and exercises added successfully.');
  } catch (error) {
    console.error('Error adding workout: ', error);
  }
};

const getWorkouts = async (memberId: string) => {
  try {
    const workoutsRef = collection(db, 'members', memberId, 'workouts');
    const workoutSnapshots = await getDocs(workoutsRef);

    const workouts = await Promise.all(
      workoutSnapshots.docs.map(async (workoutDoc) => {
        const workoutData = workoutDoc.data();
        const workoutId = workoutDoc.id;

        const exercisesRef = collection(db, 'members', memberId, 'workouts', workoutId, 'exercises');
        const exerciseSnapshots = await getDocs(exercisesRef);

        const exercises = exerciseSnapshots.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return {
          id: workoutId,
          name: workoutData.name,
          exercises,
        };
      })
    );

    return workouts;
  } catch (error) {
    console.error('Error retrieving workouts:', error);
    return [];
  }
};

const getWorkoutDetail = async (memberId: string, workoutId: string) => {
  try {
    // Get the workout document
    const workoutDocRef = doc(db, 'members', memberId, 'workouts', workoutId);
    const workoutSnapshot = await getDoc(workoutDocRef);

    if (!workoutSnapshot.exists()) {
      throw new Error('Workout not found');
    }

    const workoutData = workoutSnapshot.data();

    // Get the exercises subcollection
    const exercisesRef = collection(db, 'members', memberId, 'workouts', workoutId, 'exercises');
    const exercisesSnapshot = await getDocs(exercisesRef);

    const exercises = exercisesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      id: workoutSnapshot.id,
      name: workoutData.name,
      exercises,
    };
  } catch (error) {
    console.error('Error fetching workout detail:', error);
    return null;
  }
};

const deleteWorkout = async (memberId: string, workoutId: string) => {
  try {
    const exercisesRef = collection(db, 'members', memberId, 'workouts', workoutId, 'exercises');
    const exercisesSnapshot = await getDocs(exercisesRef);

    // Step 1: Delete all exercises
    const deleteExercisesPromises = exercisesSnapshot.docs.map((docSnap) =>
      deleteDoc(doc(db, 'members', memberId, 'workouts', workoutId, 'exercises', docSnap.id))
    );
    await Promise.all(deleteExercisesPromises);

    // Step 2: Delete the workout document
    const workoutRef = doc(db, 'members', memberId, 'workouts', workoutId);
    await deleteDoc(workoutRef);

    console.log(`Workout "${workoutId}" and its exercises deleted successfully.`);
  } catch (error) {
    console.error('Error deleting workout:', error);
  }
};

export { addWorkout, getWorkouts, getWorkoutDetail, deleteWorkout };
