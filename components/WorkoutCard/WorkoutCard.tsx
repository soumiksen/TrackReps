import { useNavigation } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import Button from '../Button/Button';
import styles from './WorkoutCard.styles';
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
    <View style={styles.container}>
      <Text style={styles.CardHeader}>{title}</Text>
      <View style={styles.cardSubtitles}>
        <View>
          <Text style={styles.cardSubtitlesText}>Time</Text>
          <Text style={styles.cardSubtitlesText2}>{time}</Text>
        </View>

        <View>
          <Text style={styles.cardSubtitlesText}>Volume</Text>
          <Text style={styles.cardSubtitlesText2}>{volume}</Text>
        </View>
      </View>

      <View>
        {list.map((item: any, index) => (
          <View key={index}>
            <Text>{item.title}</Text>
          </View>
        ))}
      </View>
      <Button
        onPress={() =>
          navigation.navigate(
            mode == 'workout' ? 'workouts/[id]' : 'routine/[id]',
            { id }
          )
        }
      >
        View Details
      </Button>
    </View>
  );
};

export default WorkoutCard;
