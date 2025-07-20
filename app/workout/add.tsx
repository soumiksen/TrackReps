import EditCard from '@/components/EditCard';
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

const AddScreen = () => {
  const [exerciseTitle, setExerciseTitle] = React.useState('');
  const [reps, setReps] = React.useState(0);
  const [lbs, setLbs] = React.useState(0);
  const [exerciseList, setExerciseList] = React.useState([]);
  const [sets, setSets] = React.useState([{ set: 1, reps: '', lbs: '' }]);
  const [showMenu, setShowMenu] = React.useState(false);

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

      <TouchableOpacity style={styles.button} onPress={() => setShowMenu(true)}>
        <Text style={{ color: '#fff' }}>Add Workout</Text>
      </TouchableOpacity>

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
        />
      )}

      <View>
        <FlatList
          data={exerciseList}
          renderItem={({ item }) => (
            <ExerciseCard
              title={item.title}
              sets={item.sets}
              onEditPress={() => setShowMenu(true)}
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

export default AddScreen;
