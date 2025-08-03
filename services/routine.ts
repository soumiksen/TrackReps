import { db } from '@/firebaseconfig';

import { addDoc, collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';

const addRoutine = async (memberId: string, workoutData: any) => {
  try {
    console.log('MEMBER ID: ', memberId)
    const workoutRef = await addDoc(
      collection(db, 'members', memberId, 'routines'),
      {
        name: workoutData.name,
      }
    );
    const exercises = workoutData.exercises;
    const exercisesCollectionRef = collection(
      db,
      'members',
      memberId,
      'routines',
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

const getRoutines = async (memberId: string) => {
  try {
    const workoutsRef = collection(db, 'members', memberId, 'routines');
    const workoutSnapshots = await getDocs(workoutsRef);

    const workouts = await Promise.all(
      workoutSnapshots.docs.map(async (workoutDoc) => {
        const workoutData = workoutDoc.data();
        const workoutId = workoutDoc.id;

        const exercisesRef = collection(db, 'members', memberId, 'routines', workoutId, 'exercises');
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

const getRoutineDetail = async (memberId: string, workoutId: string) => {
  try {
    const workoutDocRef = doc(db, 'members', memberId, 'routines', workoutId);
    const workoutSnapshot = await getDoc(workoutDocRef);

    if (!workoutSnapshot.exists()) {
      throw new Error('Workout not found');
    }

    const workoutData = workoutSnapshot.data();

    const exercisesRef = collection(db, 'members', memberId, 'routines', workoutId, 'exercises');
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

const deleteRoutine = async (memberId: string, workoutId: any) => {
  try {
    const exercisesRef = collection(db, 'members', memberId, 'routines', workoutId, 'exercises');
    const exercisesSnapshot = await getDocs(exercisesRef);

    const deleteExercisesPromises = exercisesSnapshot.docs.map((docSnap) =>
      deleteDoc(doc(db, 'members', memberId, 'routines', workoutId, 'exercises', docSnap.id))
    );
    await Promise.all(deleteExercisesPromises);

    const workoutRef = doc(db, 'members', memberId, 'routines', workoutId);
    await deleteDoc(workoutRef);

    console.log(`Workout "${workoutId}" and its exercises deleted successfully.`);
  } catch (error) {
    console.error('Error deleting workout:', error);
  }
};

export { addRoutine, getRoutines, getRoutineDetail, deleteRoutine };
