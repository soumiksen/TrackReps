import React, { useEffect } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

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
}: any) => {
  const handleUpdateValue = (index, field, value) => {
    const updatedSets = [...sets];
    updatedSets[index][field] = value;
    setSets(updatedSets);
  };

  useEffect(() => {
    if (mode === 'edit' && exerciseToEdit) {
      setExerciseTitle(exerciseToEdit.title);
      setSets(exerciseToEdit.sets);
    }
  }, [mode, exerciseToEdit]);

  const renderItem = ({ item, index }) => (
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
        setSelected={(val) => setExerciseTitle(val)}
        data={data}
        save='value'
        placeholder='Select Exercise'
        defaultOption={{ key: 'custom', value: exerciseTitle }}
      />

      <FlatList data={sets} renderItem={renderItem} />

      <Button
        title='Add another set'
        onPress={() =>
          setSets((prev) => [
            ...prev,
            { set: prev.length + 1, reps: '', lbs: '' },
          ])
        }
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
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
          setEditIndex(null);
        }}
      >
        <Text style={{ color: '#fff' }}>{mode == 'add' ? "Add Exercise" : "Update Exercise"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 15,
  },
  container: {
    padding: 16,
    display: 'flex',
    gap: 16,
    flex: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#199EFF',
    padding: 12,
    borderRadius: 8,
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
    backgroundColor: 'white',
  },
  tableInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default EditCard;
