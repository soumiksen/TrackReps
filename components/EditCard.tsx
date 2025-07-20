import React from 'react';
import {
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
  reps,
  setReps,
  lbs,
  setLbs,
  setExerciseList,
  exerciseList,
  setShowMenu,
  data
}: any) => {
  return (
    <View style={styles.menu}>
      <SelectList
        setSelected={(val) => setExerciseTitle(val)}
        data={data}
        save='value'
        placeholder='Select Exercise'
      />
      <TextInput
        value={reps}
        onChangeText={(text) => setReps(text)}
        placeholder='Enter Reps'
        style={styles.input}
      />
      <TextInput
        value={lbs}
        onChangeText={(text) => setLbs(text)}
        placeholder='Enter Pounds'
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log(lbs, reps);
          setExerciseList([
            ...exerciseList,
            {
              title: exerciseTitle,
              sets: [{ set: 1, lbs: lbs, reps: reps }],
            },
          ]);
          setReps(0);
          setLbs(0);
          setShowMenu(false);
        }}
      >
        <Text style={{ color: '#fff' }}>Add Workout</Text>
      </TouchableOpacity>
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
  },
});

export default EditCard;
