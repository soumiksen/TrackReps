import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './ExerciseCard.styles';
import { ExerciseCardProps } from './ExerciseCard.types';
import { completeSet } from '@/services/workouts';

const ExerciseCard = ({
  title,
  sets: initialSets,
  onEditPress,
  exerciseID,
  workoutID,
  userID,
  mode,
  onSetComplete, // New prop for handling set completion in parent
}: ExerciseCardProps) => {
  const [sets, setSets] = useState(initialSets);
  
  useEffect(() => {
    setSets(initialSets);
  }, [initialSets]);

  const toggleComplete = (setIndex: number, currentCompleted?: boolean) => {
    const newCompleted = !currentCompleted;
    
    // Update local state immediately for UI responsiveness
    const newSets = sets.map((set, idx) =>
      idx === setIndex ? { ...set, completed: newCompleted } : set
    );
    setSets(newSets);

    // If onSetComplete prop is provided (for seamless workout creation), use it
    if (onSetComplete) {
      onSetComplete(setIndex, newCompleted);
    } 
    // Otherwise, use the traditional Firebase call (for existing workouts)
    else if (workoutID) {
      completeSet(userID, workoutID, exerciseID, setIndex, newCompleted);
    }
    // If no workoutID and no onSetComplete, it means workout hasn't been created yet
    else {
      console.log('Workout not created yet, cannot complete set');
      // Revert local state since we can't save to Firebase
      setSets(initialSets);
    }
  };

  const isWorkoutMode = mode === 'workout';

  return (
    <View style={styles.container}>
      <View style={styles.exerciseDetails}>
        <View style={styles.exerciseDetailsLeft}>
          <View style={styles.exerciseImage} />
          <Text style={styles.exerciseTitle}>{title}</Text>
        </View>
        <TouchableOpacity onPress={onEditPress}>
          <Feather name="edit" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.headerRow}>
        <View style={styles.cell}>
          <Text style={styles.cellText}>SET</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.cellText}>LBS</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.cellText}>REPS</Text>
        </View>
        {isWorkoutMode && (
          <View style={styles.cell}>
            <Text style={styles.cellText}></Text>
          </View>
        )}
      </View>
      {sets.map((item, index) => (
        <View key={index} style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>{index + 1}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>{item.lbs}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>{item.reps}</Text>
          </View>
          {isWorkoutMode && (
            <View style={styles.cell}>
              <TouchableOpacity
                onPress={() => toggleComplete(index, item.completed)}
              >
                <MaterialIcons
                  name={
                    item.completed ? 'check-box' : 'check-box-outline-blank'
                  }
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default ExerciseCard;