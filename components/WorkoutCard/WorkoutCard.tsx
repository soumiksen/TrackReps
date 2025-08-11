import { useNavigation } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Paper from '../Paper/Paper';
import { WorkoutCardProps } from './WorkoutCard.types';

const WorkoutCard = ({
  title,
  time,
  volume,
  list,
  id,
  mode,
}: WorkoutCardProps) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(
          mode == 'workout' ? 'workouts/[id]' : 'routine/[id]',
          { id }
        )
      }
      style={{ width: '100%' }}
    >
      <Paper style={{ flexDirection: 'row', gap: 12, alignItems: 'center', width: '100%' }}>
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'grey',
            borderRadius: 18,
          }}
        />
        <View>
          <Text>{title}</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Text>{time}</Text>
            <Text>{volume}</Text>
          </View>
        </View>
      </Paper>
    </TouchableOpacity>
  );
};

export default WorkoutCard;
