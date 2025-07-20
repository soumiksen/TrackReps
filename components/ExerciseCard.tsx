import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ExerciseCard = ({ title, sets, onEditPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.exerciseDetails}>
        <View style={styles.exerciseDetailsLeft}>
          <View style={styles.exerciseImage} />
          <Text style={styles.exerciseTitle}>{title}</Text>
        </View>
        <TouchableOpacity onPress={onEditPress}>
          <Feather name='edit' color='black' size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.reps}>
        <Text>SETS</Text>
        <Text>LBS</Text>
        <Text>REPS</Text>
      </View>
      <FlatList
        data={sets}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.reps}>
            <Text>{index + 1}</Text>
            <Text>{String(item.lbs)}</Text>
            <Text>{String(item.reps)}</Text>
          </View>
        )}
      />
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
    justifyContent: 'space-between',
  },
  exerciseDetailsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  exerciseImage: {
    height: 40,
    width: 40,
    backgroundColor: 'red',
    borderRadius: 20,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ExerciseCard;
