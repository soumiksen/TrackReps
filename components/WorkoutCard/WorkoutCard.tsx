import { useNavigation } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import Button from '../Button/Button';
import styles from './WorkoutCard.styles';
import { WorkoutCardProps } from './WorkoutCard.types';

const WorkoutCard = ({ title, time, volume, list, id }: WorkoutCardProps) => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <Text style={styles.CardHeader}>{title}</Text>

      <View>
        <Text>Time</Text>
        <Text>{time}</Text>
      </View>

      <View>
        <Text>Volume</Text>
        <Text>{volume}</Text>
      </View>

      <View>
        {list.map((item: any, index) => (
          <View key={index}>
            <Text>{item.title}</Text>
          </View>
        ))}
      </View>
      <Button onPress={() => navigation.navigate('workout/[id]', { id })}>
        View Details
      </Button>
    </View>
  );
};

export default WorkoutCard;
