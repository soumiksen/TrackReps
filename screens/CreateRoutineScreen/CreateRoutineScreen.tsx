import Button from '@/components/Button/Button';
import EditCard from '@/components/EditCard/EditCard';
import ExerciseCard from '@/components/ExerciseCard/ExerciseCard';
import Input from '@/components/Input/Input';
import { AuthContext } from '@/context/AuthContext';
import { addRoutine } from '@/services/routine';
import { useLocalSearchParams } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import styles from './CreateRoutineScreen.styles';

const CreateRoutineScreen = () => {
  const [exerciseTitle, setExerciseTitle] = useState('');
  const [workoutTitle, setWorkoutTitle] = useState('');
  const [exerciseList, setExerciseList] = useState<any[]>([]);
  const [sets, setSets] = useState([{ set: 1, reps: '', lbs: '' }]);
  const [showMenu, setShowMenu] = useState(false);

  const [exerciseToEdit, setExerciseToEdit] = useState<any>(null);
  const [editIndex, setEditIndex] = useState<any>(null);

  const { uid } = useContext(AuthContext);
  const { hasPayload, payload } = useLocalSearchParams();

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

  useEffect(() => {
    if (hasPayload) {
      const parsed = JSON.parse(payload);
      setExerciseList(parsed?.exerciseList || []);
      setWorkoutTitle(parsed.exerciseTitle)
      console.log(parsed.exerciseList[0].sets)
    }
  }, []);

  return (
    <View style={styles.container}>
      <Input
        placeholder='Routine Title'
        value={workoutTitle}
        onChangeText={setWorkoutTitle}
      />

      <Button onPress={() => setShowMenu(true)}>Add Exercises</Button>

      {showMenu && (
        <EditCard
          exerciseTitle={exerciseTitle}
          setExerciseTitle={setExerciseTitle}
          exerciseList={exerciseList}
          setExerciseList={setExerciseList}
          sets={sets}
          setSets={setSets}
          setShowMenu={setShowMenu}
          data={data}
          mode={editIndex !== null ? 'edit' : 'add'}
          setEditIndex={setEditIndex}
          exerciseToEdit={exerciseToEdit}
          indexToEdit={editIndex}
          variant='routine'
        />
      )}

      <View>
        <FlatList
          data={exerciseList}
          renderItem={({ item, index }) => (
            <ExerciseCard
              title={item.title}
              sets={item.sets}
              onEditPress={() => handleEditPress(item, index)}
              mode='routine'
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      </View>
      <View style={styles.bottomBtn}>
        <Button
          onPress={() =>
            addRoutine(uid, {
              name: workoutTitle,
              exercises: exerciseList,
            })
          }
        >
          Add Routine
        </Button>
      </View>
    </View>
  );
};

export default CreateRoutineScreen;
