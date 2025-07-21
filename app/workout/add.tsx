import Button from '@/components/Button';
import EditCard from '@/components/EditCard';
import ExerciseCard from '@/components/ExerciseCard';
import React, { useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';

const AddScreen = () => {
  const [exerciseTitle, setExerciseTitle] = useState('');
  const [exerciseList, setExerciseList] = useState([]);
  const [sets, setSets] = useState([{ set: 1, reps: '', lbs: '' }]);
  const [showMenu, setShowMenu] = useState(false);

  const [exerciseToEdit, setExerciseToEdit] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const data = [
    { key: '1', value: 'Upper', disabled: true },
    { key: '2', value: 'Bicep Curl' },
    { key: '3', value: 'Hammer Curl' },
    { key: '4', value: 'Lower', disabled: true },
    { key: '5', value: 'Leg Extension' },
    { key: '6', value: 'Calf Extension' },
  ];

  const handleEditPress = (exercise, index) => {
    setExerciseTitle(exercise.title);
    setSets(exercise.sets);
    setExerciseToEdit(exercise);
    setEditIndex(index);
    setShowMenu(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Workout Title'
        placeholderTextColor={'black'}
      />

      <Button onPress={() => setShowMenu(true)}>Add Workout</Button>

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

      <View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
  },
  container: {
    padding: 16,
    display: 'flex',
    gap: 16,
    flex: 1,
  },
  menu: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    display: 'flex',
    gap: 16,
    padding: 16,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 8,
    zIndex: 1000,
    borderBottomColor: 'transparent',
  },
});

export default AddScreen;
