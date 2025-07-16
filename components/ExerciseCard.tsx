import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ExerciseCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.exerciseDetails}>
        <View style={styles.exerciseImage}/>
        <Text style={styles.exerciseTitle}>Bicep Curl</Text>
      </View>
      <View style={styles.reps}>
        <Text>SETS</Text>
        <Text>LBS</Text>
        <Text>REPS</Text>
      </View>
      <View style={styles.reps}>
        <Text>1</Text>
        <Text>20</Text>
        <Text>15</Text>
      </View>
      <View style={styles.reps}>
        <Text>2</Text>
        <Text>30</Text>
        <Text>15</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reps: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    borderColor: '#199EFF',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  exerciseDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  exerciseImage: {
    height: 40,
    width: 40,
    backgroundColor: 'red',
    borderRadius: 20
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default ExerciseCard;
