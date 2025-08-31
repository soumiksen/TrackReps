import { db } from '@/firebaseconfig';
import { format, startOfWeek } from 'date-fns';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  updateDoc,
} from 'firebase/firestore';

const addWorkout = async (memberId: string, workoutData: any) => {
  try {
    const workoutRef = await addDoc(
      collection(db, 'members', memberId, 'workouts'),
      {
        name: workoutData.name,
        timestamp: new Date(),
      }
    );

    const exercisesCollectionRef = collection(
      db,
      'members',
      memberId,
      'workouts',
      workoutRef.id,
      'exercises'
    );

    const addExercisePromises = workoutData.exercises.map((exercise: object) =>
      addDoc(exercisesCollectionRef, exercise)
    );
    await Promise.all(addExercisePromises);

    console.log('Workout added successfully (stats will update when sets are completed).');
  } catch (error) {
    console.error('Error adding workout: ', error);
  }
};

const completeSet = async (
  memberId: string,
  workoutId: any,
  exerciseId: any,
  setIndex: number,
  completed: boolean
) => {
  try {
    const exerciseRef = doc(
      db,
      'members',
      memberId,
      'workouts',
      workoutId,
      'exercises',
      exerciseId
    );

    const exerciseSnap = await getDoc(exerciseRef);
    if (!exerciseSnap.exists()) throw new Error('Exercise not found');

    const exerciseData = exerciseSnap.data();
    const sets = exerciseData.sets || [];

    if (setIndex < 0 || setIndex >= sets.length) {
      throw new Error('Invalid set index');
    }

    const prevCompleted = sets[setIndex].completed || false;
    sets[setIndex] = { ...sets[setIndex], completed };

    await updateDoc(exerciseRef, { sets });

    console.log(
      `Set ${setIndex + 1} marked as ${completed ? 'completed' : 'incomplete'}`
    );

    if (!prevCompleted && completed) {
      const reps = sets[setIndex].reps || 0;
      const weight = sets[setIndex].weight || 0;

      const day = new Date().getDay();
      const dayIndex = (day + 6) % 7;
      const monday = startOfWeek(new Date(), { weekStartsOn: 1 });
      const weekStart = format(monday, 'yyyy-MM-dd');

      const memberRef = doc(db, 'members', memberId);
      const memberSnap = await getDoc(memberRef);

      let weeklyReps = Array(7).fill(0);
      if (memberSnap.exists()) {
        const memberData = memberSnap.data();
        if (memberData.weeklyReps?.weekStart === weekStart) {
          weeklyReps = memberData.weeklyReps.reps;
        }
      }

      weeklyReps[dayIndex] += reps;

      await updateDoc(memberRef, {
        repsCompletedInMonth: increment(reps),
        totalRepsCompleted: increment(reps),
        weightLiftedInMonth: increment(weight * reps),
        totalWeightLifted: increment(weight * reps),
        weekStart,
        weeklyReps: { weekStart, reps: weeklyReps },
      });

      console.log('Member stats updated after set completion.');
    }
  } catch (error) {
    console.error('Error updating set completion:', error);
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

        const exercisesRef = collection(
          db,
          'members',
          memberId,
          'workouts',
          workoutId,
          'exercises'
        );
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

const getWorkoutDetail = async (memberId: string, workoutId: any) => {
  try {
    const workoutDocRef = doc(db, 'members', memberId, 'workouts', workoutId);
    const workoutSnapshot = await getDoc(workoutDocRef);

    if (!workoutSnapshot.exists()) {
      throw new Error('Workout not found');
    }

    const workoutData = workoutSnapshot.data();

    const exercisesRef = collection(
      db,
      'members',
      memberId,
      'workouts',
      workoutId,
      'exercises'
    );
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
    const exercisesRef = collection(
      db,
      'members',
      memberId,
      'workouts',
      workoutId,
      'exercises'
    );
    const exercisesSnapshot = await getDocs(exercisesRef);

    const deleteExercisesPromises = exercisesSnapshot.docs.map((docSnap) =>
      deleteDoc(
        doc(
          db,
          'members',
          memberId,
          'workouts',
          workoutId,
          'exercises',
          docSnap.id
        )
      )
    );
    await Promise.all(deleteExercisesPromises);

    const workoutRef = doc(db, 'members', memberId, 'workouts', workoutId);
    await deleteDoc(workoutRef);

    console.log(
      `Workout "${workoutId}" and its exercises deleted successfully.`
    );
  } catch (error) {
    console.error('Error deleting workout:', error);
  }
};

const getWeeklyStats = async (memberId: string) => {
  try {
    const monday = startOfWeek(new Date(), { weekStartsOn: 1 });
    const currentWeekStart = format(monday, 'yyyy-MM-dd');

    const memberRef = doc(db, 'members', memberId);
    const memberSnap = await getDoc(memberRef);

    if (!memberSnap.exists()) {
      throw new Error('Member not found');
    }

    const memberData = memberSnap.data();
    let weeklyReps = Array(7).fill(0);

    if (memberData.weeklyReps?.weekStart === currentWeekStart) {
      weeklyReps = memberData.weeklyReps.reps || weeklyReps;
    }

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const statsByDay = days.map((day, i) => ({
      day,
      reps: weeklyReps[i],
    }));

    return {
      weekStart: currentWeekStart,
      statsByDay,
    };
  } catch (error) {
    console.error('Error fetching weekly stats:', error);
    return null;
  }
};


export {
  addWorkout,
  completeSet,
  deleteWorkout,
  getWorkoutDetail,
  getWorkouts,
  getWeeklyStats
};
