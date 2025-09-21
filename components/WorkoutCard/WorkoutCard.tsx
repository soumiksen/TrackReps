import { useNavigation } from 'expo-router';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Paper from '../Paper/Paper';
import { WorkoutCardProps } from './WorkoutCard.types';

const WorkoutCard = ({ title, reps, volume, id, mode, duration }: WorkoutCardProps) => {
  const navigation = useNavigation<any>();

  const formatDuration = (durationInSeconds: number): string => {
    if (!durationInSeconds || durationInSeconds === 0) return '0min';
    
    const totalMinutes = Math.floor(durationInSeconds / 60);
    const remainingSeconds = durationInSeconds % 60;
    
    if (totalMinutes === 0) {
      return '1min';
    } else if (remainingSeconds === 0) {
      return `${totalMinutes}min`;
    } else {
      return `${totalMinutes}min`;
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate(
          mode == 'workout' ? 'workouts/[id]' : 'routine/[id]',
          { id }
        )
      }
    >
      <View>
        <Paper
          style={{
            flexDirection: 'row',
            gap: 12,
            alignItems: 'center',
            width: '100%',
          }}
        >
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
            {mode == 'workout' && (
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <Text>{reps} reps</Text>
                <Text>{volume} lbs</Text>
                <Text>{formatDuration(parseInt(duration) || 0)}</Text>
              </View>
            )}
          </View>
        </Paper>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default WorkoutCard;