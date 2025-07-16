import { useNavigation } from 'expo-router';
import React, { use } from 'react';
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';

const WorkoutCard = ({ title, time, volume, list }) => {
  const navigation = useNavigation()

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
      <TouchableOpacity onPress={() => navigation.navigate('workout/[id]', { id: title })}>
        <Text style={styles.btn}>View Details</Text>
      </TouchableOpacity>
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
  textColor: {
    
  },
  btn: {
    textAlign: 'center',
    color: '#ffff',
    backgroundColor: '#199EFF',
    borderRadius: 5,
    padding: 5
  }
});

export default WorkoutCard;
