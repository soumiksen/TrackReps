import StreakCard from '@/components/StreakCard';
import WorkoutSlider from '@/components/WorkoutSlider';
import DataList from '@/services/data';
import { useNavigation } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.welcomeText}>Hi Mark!</Text>
        <StreakCard />
      </View>
      <View>
        <Text style={styles.workoutText}>Workouts</Text>
        <View>
          <WorkoutSlider data={DataList} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('workout/add')}
          style={styles.addButton}
        >
          <Text style={styles.textColor}>Add Workout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: 16,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  workoutText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 12,
    backgroundColor: '#199EFF',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  textColor: { color: '#FFFFFF' },
});
