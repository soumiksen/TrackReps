import { useNavigation } from 'expo-router';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Paper from '../Paper/Paper';
import { WorkoutCardProps } from './WorkoutCard.types';

const WorkoutCard = ({
  title,
  reps,
  volume,
  id,
  mode,
}: WorkoutCardProps) => {
  const navigation = useNavigation<any>();

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
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Text>{reps}reps</Text>
              <Text>{volume}lbs</Text>
            </View>
          </View>
        </Paper>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default WorkoutCard;
