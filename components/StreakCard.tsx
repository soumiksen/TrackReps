import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const StreakCard = () => {
  return (
    <View style={styles.StreakCard}>
      <View style={styles.streakContainer}>
        <View style={styles.streak}>
          <FontAwesome5 name='fire-alt' size={24} color='#D72368' />
          <Text style={{ color: '#FFF' }}>Mon</Text>
        </View>
        <View style={styles.streak}>
          <FontAwesome5 name='fire-alt' size={24} color='#D72368' />
          <Text style={{ color: '#FFF' }}>Tues</Text>
        </View>
        <View style={styles.streak}>
          <FontAwesome5 name='fire-alt' size={24} color='#D72368' />
          <Text style={{ color: '#FFF' }}>Wed</Text>
        </View>
        <View style={styles.streak}>
          <FontAwesome5 name='fire-alt' size={24} color='#D72368' />
          <Text style={{ color: '#FFF' }}>Thurs</Text>
        </View>
        <View style={styles.streak}>
          <FontAwesome5 name='fire-alt' size={24} color='#D72368' />
          <Text style={{ color: '#FFF' }}>Fri</Text>
        </View>
        <View style={styles.streak}>
          <FontAwesome5 name='fire-alt' size={24} color='#D72368' />
          <Text style={{ color: '#FFF' }}>Sat</Text>
        </View>
        <View style={styles.streak}>
          <Fontisto name='fire' size={24} color='#D72368' />
          <Text style={{ color: '#FFF' }}>Sun</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  StreakCard: {
    backgroundColor: '#199EFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  streakContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  streak: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
});

export default StreakCard;
