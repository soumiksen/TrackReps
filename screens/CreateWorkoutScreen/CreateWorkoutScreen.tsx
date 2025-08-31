import ExpandingButtonRow from '@/components/Animations/ExpandingButtonRow';
import RoutineButtons from '@/components/Animations/RoutineButtons';
import SlideUpCard from '@/components/Animations/SlideUpCard';
import Button from '@/components/Button/Button';
import EditCard from '@/components/EditCard/EditCard';
import ExerciseCard from '@/components/ExerciseCard/ExerciseCard';
import Input from '@/components/Input/Input';
import { AuthContext } from '@/context/AuthContext';
import { getRoutines } from '@/services/routine';
import { addWorkout } from '@/services/workouts';
import React, { useContext, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, View } from 'react-native';
import styles from './CreateWorkoutScreen.styles';

const CreateWorkoutScreen = () => {
  const [exerciseTitle, setExerciseTitle] = useState('');
  const [workoutTitle, setWorkoutTitle] = useState('');
  const [exerciseList, setExerciseList] = useState<any[]>([]);
  const [sets, setSets] = useState([
    { set: 1, reps: '', lbs: '', completed: false },
  ]);
  const [showMenu, setShowMenu] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [routines, setRoutines] = useState([]);

  const [exerciseToEdit, setExerciseToEdit] = useState<any>(null);
  const [editIndex, setEditIndex] = useState<any>(null);

  const { uid } = useContext(AuthContext);

  const data = [
    { key: '1', value: 'Upper', disabled: true },
    { key: '2', value: 'Bicep Curl' },
    { key: '3', value: 'Hammer Curl' },
    { key: '4', value: 'Lower', disabled: true },
    { key: '5', value: 'Leg Extension' },
    { key: '6', value: 'Calf Extension' },
  ];

  const handleEditPress = (exercise: any, index: any) => {
    setExerciseTitle(exercise.title);
    setSets(exercise.sets);
    setExerciseToEdit(exercise);
    setEditIndex(index);
    setShowMenu(true);
  };

  const handleCreateWorkout = () => {
    let totalReps = 0;
    let totalWeight = 0;

    exerciseList.forEach((exercise) => {
      exercise.sets.forEach((set: any) => {
        totalReps += parseFloat(set.reps);
        if (set.lbs) {
          totalWeight += parseFloat(set.lbs);
        }
      });
    });

    addWorkout(
      uid,
      {
        name: workoutTitle,
        exercises: exerciseList,
      },
      totalWeight,
      totalReps
    );
  };

  const loadRoutines = async () => {
    const res = await getRoutines(uid);
    setRoutines(res);
  };

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
            data={data}
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
                sets={item.sets}
                onEditPress={() => handleEditPress(item, index)}
                mode='workout'
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          />
        </View>
        <View style={styles.bottomBtn}>
          <Button onPress={handleCreateWorkout}>Add Workout</Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateWorkoutScreen;
