import ExerciseCard from '@/components/ExerciseCard';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { SafeAreaView } from 'react-native-safe-area-context';

const Add = () => {
  const [exerciseTitle, setExerciseTitle] = React.useState('');
  const [reps, setReps] = React.useState(0)
  const [lbs, setLbs] = React.useState(0)
  const [exerciseList, setExerciseList] = React.useState([]);

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
      <TextInput
        style={styles.input}
        placeholder='Workout Title'
        placeholderTextColor={'black'}
      />

      <SelectList
        setSelected={(val) => setExerciseTitle(val)}
        data={data}
        save='value'
        placeholder='Select Workout'
      />
      <TextInput value={reps} onChange={(text) => setReps(text)} placeholder='Enter Reps' style={styles.input} />
      <TextInput value={lbs} onChange={(text) => setLbs(text)} placeholder='Enter Pounds' style={styles.input} />
>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          setExerciseList([
            {
              title: exerciseTitle,
              reps: reps,
              lbs: lbs,
              key: Math.random().toString(),
            },
            ...exerciseList,
          ])
        }
      >
        <Text style={{ color: '#fff' }}>Add Workout</Text>
      </TouchableOpacity>

      <View>
        <FlatList
          data={exerciseList}
          renderItem={({ item }) => <ExerciseCard />}
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
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#199EFF',
    padding: 12,
    borderRadius: 8,
  },
});

export default Add;
