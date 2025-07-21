import EditCard from '@/components/EditCard/EditCard';
import ExerciseCard from '@/components/ExerciseCard/ExerciseCard';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import styles from './WorkoutDetailScreen.styles';

const WorkoutDetailsScreen = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [exerciseTitle, setExerciseTitle] = useState('');
  const [exerciseList, setExerciseList] = useState([
    {
      title: 'Bicep Curl',
      sets: [{ set: 1, lbs: 20, reps: 15 }],
    },
    {
      title: 'Tricep Extension',
      sets: [{ set: 1, lbs: 25, reps: 12 }],
    },
  ]);
  const [sets, setSets] = useState([{ set: 1, reps: '', lbs: '' }]);

  const [exerciseToEdit, setExerciseToEdit] = useState<any>(null);
  const [editIndex, setEditIndex] = useState<any>(null);

  const handleEditPress = (exercise: any, index: any) => {
    setExerciseToEdit(exercise);
    setEditIndex(index);
    setExerciseTitle(exercise.title);
    setSets(exercise.sets);
    setShowMenu(true);
  };

  const data = [
    { key: '1', value: 'Upper', disabled: true },
    { key: '2', value: 'Bicep Curl' },
    { key: '3', value: 'Hammer Curl' },
    { key: '4', value: 'Lower', disabled: true },
    { key: '5', value: 'Leg Extension' },
    { key: '6', value: 'Calf Extension' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upper + Core</Text>
      <View style={styles.exerciseList}>
        <FlatList
          data={exerciseList}
          renderItem={({ item, index }) => (
            <ExerciseCard
              title={item.title}
              sets={item.sets.map((set) => ({
                ...set,
                reps: String(set.reps),
                lbs: String(set.lbs),
              }))}
              onEditPress={() => handleEditPress(item, index)}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      </View>
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
        />
      )}
    </View>
  );
};



export default WorkoutDetailsScreen;
