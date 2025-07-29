import Button from '@/components/Button/Button';
import StreakCard from '@/components/StreakCard/StreakCard';
import WorkoutSlider from '@/components/WorkoutSlider/WorkoutSlider';
import { AuthContext } from '@/context/AuthContext';
import { getWorkouts } from '@/services/workouts';
import { useNavigation } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './HomeScreen.styles';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { firstName, uid } = useContext(AuthContext);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await getWorkouts(uid);      
        const formattedData:any = res.map((item) => ({
          title: item.name,
          list: item.exercises,
          id: item.id
        }));

        setData(formattedData);
      } catch (error) {
        console.error('Failed to fetch workouts:', error);
      }
    };

    if (uid) fetchWorkouts();
  }, [uid]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.welcomeText}>Hi {firstName}!</Text>
        <StreakCard />
      </View>
      <View>
        <Text style={styles.workoutText}>Workouts</Text>
        <View>
          <WorkoutSlider data={data} />
        </View>
        <Button onPress={() => navigation.navigate('workout/add' as never)}>
          Add Workout
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
