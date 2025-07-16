import ExerciseCard from '@/components/ExerciseCard';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const WorkoutDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upper + Core</Text>
      <View style={styles.exerciseList}>
        <ExerciseCard />
        <ExerciseCard />
        <ExerciseCard />
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

export default WorkoutDetails;
