import Button from '@/components/Button/Button';
import StreakCard from '@/components/StreakCard/StreakCard';
import WorkoutSlider from '@/components/WorkoutSlider/WorkoutSlider';
import DataList from '@/services/data';
import { useNavigation } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './HomeScreen.styles';

const HomeScreen = () => {
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
        <Button onPress={() => navigation.navigate('workout/add' as never)}>
          Add Workout
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
