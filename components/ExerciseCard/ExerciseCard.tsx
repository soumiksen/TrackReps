import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import styles from './ExerciseCard.styles';
import { ExerciseCardProps } from './ExerciseCard.types';

const ExerciseCard = ({ title, sets, onEditPress }: ExerciseCardProps) => {
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

export default ExerciseCard;
