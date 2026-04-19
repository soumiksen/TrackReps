import ExpandingButtonRow from '@/components/Animations/ExpandingButtonRow';
import RoutineButtons from '@/components/Animations/RoutineButtons';
import SlideUpCard from '@/components/Animations/SlideUpCard';
import Button from '@/components/Button/Button';
import EditCard from '@/components/EditCard/EditCard';
import ExerciseCard from '@/components/ExerciseCard/ExerciseCard';
import Input from '@/components/Input/Input';
import { AuthContext } from '@/context/AuthContext';
import { getRoutines } from '@/services/routine';
import { updateWorkout, completeSet } from '@/services/workouts';
import { useNavigation } from 'expo-router';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, View } from 'react-native';
import styles from './CreateWorkoutScreen.styles';

const CreateWorkoutScreen = () => {
  const navigation = useNavigation<any>();

  const [exerciseTitle, setExerciseTitle] = useState('');
  const [workoutTitle, setWorkoutTitle] = useState('');
  const [exerciseList, setExerciseList] = useState<any[]>([]);
  const [sets, setSets] = useState([
    { set: 1, reps: '', lbs: '', completed: false },
  ]);
  const [showMenu, setShowMenu] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [routines, setRoutines] = useState<
    { id: string; name: any; exercises: { id: string }[] }[]
  >([]);

  const [exerciseToEdit, setExerciseToEdit] = useState<any>(null);
  const [editIndex, setEditIndex] = useState<any>(null);
  const [seconds, setSeconds] = useState(0);
  
  const [currentWorkoutId, setCurrentWorkoutId] = useState<string | null>(null);
  const [isWorkoutCreated, setIsWorkoutCreated] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds
  ).padStart(2, '0')}`;

  const { uid } = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: isTimerActive ? formattedTime : 'New Workout',
    });
  }, [navigation, formattedTime, isTimerActive]);

  const createWorkoutIfNeeded = async () => {
    if (!isWorkoutCreated && exerciseList.length > 0) {
      const today = new Date();
      const options = { month: 'short', day: 'numeric', year: 'numeric' };
      const formattedDate = today.toLocaleDateString('en-US', options as any);
      
      try {
        const { addDoc, collection } = require('firebase/firestore');
        const { db } = require('@/firebaseconfig');
        
        const workoutRef = await addDoc(
          collection(db, 'members', uid, 'workouts'),
          {
            name: workoutTitle === '' ? formattedDate : workoutTitle,
            timestamp: new Date(),
            duration: 0, 
          }
        );

        const exercisesCollectionRef = collection(
          db,
          'members',
          uid,
          'workouts',
          workoutRef.id,
          'exercises'
        );

        const addExercisePromises = exerciseList.map(async (exercise: any) => {
          const docRef = await addDoc(exercisesCollectionRef, exercise);
          return { ...exercise, id: docRef.id };
        });
        const exercisesWithIds = await Promise.all(addExercisePromises);
        
        setExerciseList(exercisesWithIds);
        
        setCurrentWorkoutId(workoutRef.id);
        setIsWorkoutCreated(true);
        setIsTimerActive(true); 
        console.log('Workout auto-created successfully with ID:', workoutRef.id);
      } catch (error) {
        console.log('Error auto-creating workout:', error);
      }
    }
  };

  const updateWorkoutDuration = async (durationInSeconds: number) => {
    if (currentWorkoutId && isWorkoutCreated) {
      try {
        const { updateDoc, doc } = require('firebase/firestore');
        const { db } = require('@/firebaseconfig');
        
        const workoutRef = doc(db, 'members', uid, 'workouts', currentWorkoutId);
        await updateDoc(workoutRef, {
          duration: durationInSeconds,
        });
      } catch (error) {
        console.log('Error updating workout duration:', error);
      }
    }
  };

  const updateWorkoutIfNeeded = async () => {
    if (isWorkoutCreated && currentWorkoutId && exerciseList.length > 0) {
      try {
        const { updateDoc, doc } = require('firebase/firestore');
        const { db } = require('@/firebaseconfig');
        
        const workoutRef = doc(db, 'members', uid, 'workouts', currentWorkoutId);
        await updateDoc(workoutRef, {
          name: workoutTitle === '' ? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : workoutTitle,
        });
        
        console.log('Workout title updated successfully');
      } catch (error) {
        console.log('Error updating workout:', error);
      }
    }
  };

  const handleSetCompletion = async (exerciseId: string, setIndex: number, completed: boolean) => {
    if (!currentWorkoutId) return;
    
    try {
      await completeSet(uid, currentWorkoutId, exerciseId, setIndex, completed);
      
      await updateWorkoutDuration(seconds);
      
      setExerciseList(prevList =>
        prevList.map(exercise => {
          if (exercise.id === exerciseId) {
            const updatedSets = [...exercise.sets];
            updatedSets[setIndex] = { ...updatedSets[setIndex], completed };
            return { ...exercise, sets: updatedSets };
          }
          return exercise;
        })
      );
    } catch (error) {
      console.log('Error completing set:', error);
    }
  };

  const handleEditPress = (exercise: any, index: any) => {
    setExerciseTitle(exercise.title);
    setSets(exercise.sets);
    setExerciseToEdit(exercise);
    setEditIndex(index);
    setShowMenu(true);
  };

  const handleFinishWorkout = async () => {
    if (currentWorkoutId && isTimerActive) {
      try {
        setIsTimerActive(false);
        
        await updateWorkoutDuration(seconds);
        
        console.log(`Workout finished with duration: ${formattedTime}`);
      } catch (error) {
        console.log('Error saving final workout duration:', error);
      }
    }
    
    navigation.navigate('(tabs)');
  };

  const loadRoutines = async () => {
    const res = await getRoutines(uid);
    setRoutines(res);
  };

  const addNewExerciseToWorkout = async (newExercise: any) => {
    if (isWorkoutCreated && currentWorkoutId) {
      try {
        const { addDoc, collection } = require('firebase/firestore');
        const { db } = require('@/firebaseconfig');
        
        const exercisesCollectionRef = collection(
          db,
          'members',
          uid,
          'workouts',
          currentWorkoutId,
          'exercises'
        );
        
        const docRef = await addDoc(exercisesCollectionRef, newExercise);
        return { ...newExercise, id: docRef.id };
      } catch (error) {
        console.log('Error adding new exercise:', error);
        return newExercise;
      }
    }
    return newExercise;
  };

  useEffect(() => {
    const handleExerciseChanges = async () => {
      if (exerciseList.length > 0) {
        if (!isWorkoutCreated) {
          await createWorkoutIfNeeded();
        } else {
          const exercisesWithoutIds = exerciseList.filter(exercise => !exercise.id);
          if (exercisesWithoutIds.length > 0) {
            const updatedExercises = await Promise.all(
              exercisesWithoutIds.map(exercise => addNewExerciseToWorkout(exercise))
            );
            
            setExerciseList(prevList => 
              prevList.map(exercise => {
                if (!exercise.id) {
                  const updatedExercise = updatedExercises.find(updated => 
                    updated.title === exercise.title && 
                    JSON.stringify(updated.sets) === JSON.stringify(exercise.sets)
                  );
                  return updatedExercise || exercise;
                }
                return exercise;
              })
            );
          }
        }
      }
    };
    
    handleExerciseChanges();
  }, [exerciseList.length]); 

  useEffect(() => {
    if (isWorkoutCreated && currentWorkoutId) {
      updateWorkoutIfNeeded();
    }
  }, [workoutTitle]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isTimerActive) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isTimerActive]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Input
          placeholder='Workout Title'
          value={workoutTitle}
          onChangeText={setWorkoutTitle}
        />
        <ExpandingButtonRow
          showBtn={showBtn}
          btn1={
            <Button
              onPress={() => {
                setShowMenu(true);
                setShowBtn(true);
              }}
              variant={'primary'}
            >
              Add Exercises
            </Button>
          }
          btn2={<Button onPress={loadRoutines}>Load Routine</Button>}
        />

        <RoutineButtons
          routines={routines}
          setWorkoutTitle={setWorkoutTitle}
          setExerciseList={setExerciseList}
          setRoutines={setRoutines}
          setShowBtn={setShowBtn}
        />

        <SlideUpCard visible={showMenu}>
          <EditCard
            exerciseTitle={exerciseTitle}
            setExerciseTitle={setExerciseTitle}
            exerciseList={exerciseList}
            setExerciseList={setExerciseList}
            sets={sets}
            setSets={setSets}
            setShowMenu={setShowMenu}
            mode={'add'}
            setEditIndex={setEditIndex}
            exerciseToEdit={exerciseToEdit}
            indexToEdit={editIndex}
            variant='workout'
          />
        </SlideUpCard>

        <View>
          <FlatList
            data={exerciseList}
            renderItem={({ item, index }) => (
              <ExerciseCard
                title={item.title}
                sets={item.sets.map((set: any) => ({
                  ...set,
                  reps: String(set.reps),
                  lbs: String(set.lbs),
                  completed: set.completed,
                }))}
                onEditPress={() => handleEditPress(item, index)}
                onSetComplete={(setIndex: number, completed: boolean) => 
                  handleSetCompletion(item.id, setIndex, completed)
                }
                workoutID={currentWorkoutId || undefined}
                mode='workout'
                userID={uid}
                exerciseID={item.id}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          />
        </View>
        
        {isWorkoutCreated && exerciseList.length > 0 && (
          <View style={styles.bottomBtn}>
            <Button onPress={handleFinishWorkout}>Finish Workout</Button>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateWorkoutScreen;