import Button from '@/components/Button';
import StreakCard from '@/components/StreakCard';
import WorkoutSlider from '@/components/WorkoutSlider';
import DataList from '@/services/data';
import { useNavigation } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
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
        <Button onPress={() => navigation.navigate('workout/add')}>
          Add Workout
        </Button>
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
