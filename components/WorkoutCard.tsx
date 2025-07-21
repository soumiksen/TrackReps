import { useNavigation } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './Button';

const WorkoutCard = ({ title, time, volume, list }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.CardHeader}>{title}</Text>

      <View>
        <Text style={styles.textColor}>Time</Text>
        <Text style={styles.textColor}>{time}</Text>
      </View>

      <View>
        <Text style={styles.textColor}>Volume</Text>
        <Text style={styles.textColor}>{volume}</Text>
      </View>

      <View>
        {list.map((item, index) => (
          <View key={index}>
            <Text style={styles.textColor}>{item}</Text>
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

const styles = StyleSheet.create({
  container: {
    color: '#ffffff',
    padding: 16,
    borderColor: '#199EFF',
    borderWidth: 1,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  CardHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default WorkoutCard;
