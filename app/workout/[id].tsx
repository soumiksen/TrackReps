import EditCard from '@/components/EditCard';
import ExerciseCard from '@/components/ExerciseCard';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

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

  const [exerciseToEdit, setExerciseToEdit] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const handleEditPress = (exercise, index) => {
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
              sets={item.sets}
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

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  container: {
    padding: 16,
    flex: 1,
  },
  exerciseList: {
    display: 'flex',
    gap: 10,
  },
});

export default WorkoutDetailsScreen;
