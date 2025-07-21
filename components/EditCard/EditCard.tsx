import Button from '@/components/Button/Button';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { EditCardProps } from './EditCard.types';
import styles from './EditCard.styles';

const EditCard = ({
  exerciseTitle,
  setExerciseTitle,
  setExerciseList,
  exerciseList,
  setShowMenu,
  data,
  sets,
  setSets,
  mode = 'add',
  exerciseToEdit,
  indexToEdit,
  setEditIndex,
}: EditCardProps) => {
  const handleUpdateValue = (index: number, field: string, value: string) => {
    const updatedSets: any = [...sets];
    updatedSets[index][field] = value;
    setSets(updatedSets);
  };

  const handleAddWorkout = () => {
    if (mode === 'edit' && indexToEdit !== undefined) {
      const updatedList = [...exerciseList];
      updatedList[indexToEdit] = {
        title: exerciseTitle,
        sets: sets,
      };
      setExerciseList(updatedList);
    } else {
      setExerciseList([
        ...exerciseList,
        {
          title: exerciseTitle,
          sets: sets,
        },
      ]);
    }
    setSets([{ set: 1, reps: '', lbs: '' }]);
    setShowMenu(false);
    if (setEditIndex) {
      setEditIndex(null);
    }
  };

  const handleAddSet = () => {
    setSets((prev: { set: number; reps: string; lbs: string }[]) => [
      ...prev,
      { set: prev.length + 1, reps: '', lbs: '' },
    ]);
  };

  useEffect(() => {
    if (mode === 'edit' && exerciseToEdit) {
      setExerciseTitle(exerciseToEdit.title);
      setSets(exerciseToEdit.sets);
    }
  }, [mode, exerciseToEdit]);

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.tableInput}>
      <Text>{index + 1}</Text>
      <TextInput
        value={String(item.lbs)}
        onChangeText={(text) => handleUpdateValue(index, 'lbs', text)}
        placeholder='Enter Pounds'
        style={styles.input}
      />
      <TextInput
        value={String(item.reps)}
        onChangeText={(text) => handleUpdateValue(index, 'reps', text)}
        placeholder='Enter Reps'
        style={styles.input}
      />
    </View>
  );

  return (
    <View style={styles.menu}>
      <SelectList
        setSelected={setExerciseTitle}
        data={data}
        save='value'
        placeholder='Select Exercise'
        defaultOption={{ key: 'custom', value: exerciseTitle }}
      />

      <FlatList data={sets} renderItem={renderItem} />

      <Button onPress={handleAddSet} variant='outlined'>
        Add another set
      </Button>

      <Button onPress={handleAddWorkout}>
        {mode == 'add' ? 'Add Exercise' : 'Update Exercise'}
      </Button>
    </View>
  );
};

export default EditCard;
