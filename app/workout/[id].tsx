import ExerciseCard from '@/components/ExerciseCard';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const Exercises = [
  {
    id: 1,
    title: 'Bicep Curl',
    sets: [
      { set: 1, lbs: 20, reps: 15 },
    ],
  },
  {
    id: 2,
    title: 'Tricep Extension',
    sets: [
      { set: 1, lbs: 25, reps: 12 },
    ],
  },
];

const WorkoutDetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upper + Core</Text>
      <View style={styles.exerciseList}>
        <FlatList
          data={Exercises}
          renderItem={({ item }) => (
            <ExerciseCard title={item.title} sets={item.sets} onEditPress={() => console.log(1)}/>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      </View>
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
  },
  exerciseList: {
    display: 'flex',
    gap: 10,
  },
});

export default WorkoutDetailsScreen;
