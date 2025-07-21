import { useNavigation } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../Button/Button';
import { WorkoutCardProps } from './WorkoutCard.types';
import styles from './WorkoutCard.styles';


const WorkoutCard = ({ title, time, volume, list }: WorkoutCardProps) => {
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
        {list.map((item, index) => (
          <View key={index}>
            <Text>{item}</Text>
          </View>
        ))}
      </View>
      <Button
        onPress={() => navigation.navigate('workout/[id]', { id: title })}
      >
        View Details
      </Button>
    </View>
  );
};



export default WorkoutCard;
