import Button from '@/components/Button/Button';
import Container from '@/components/Container/Container';
import StreakCard from '@/components/StreakCard/StreakCard';
import WorkoutSlider from '@/components/WorkoutSlider/WorkoutSlider';
import { AuthContext } from '@/context/AuthContext';
import { getRoutines } from '@/services/routine';
import { getWorkouts } from '@/services/workouts';
import { useNavigation } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import styles from './HomeScreen.styles';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { firstName, uid } = useContext(AuthContext);

  const [routines, setRoutines] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res1 = await getRoutines(uid);
        const formattedData1: any = res1.map((item) => ({
          title: item.name,
          list: item.exercises,
          id: item.id,
        }));
        setRoutines(formattedData1);

        const res2 = await getWorkouts(uid);
        const formattedData2: any = res2.map((item) => ({
          title: item.name,
          list: item.exercises,
          id: item.id,
        }));
        setWorkouts(formattedData2);
      } catch (error) {
        console.error('Failed to fetch workouts:', error);
      }
    };

    if (uid) fetchWorkouts();
  }, [uid]);

  return (
    <Container>
      <View>
        <Text style={styles.welcomeText}>Hi {firstName}!</Text>
        <StreakCard />
      </View>
      <View>
        <View style={styles.btnContainer}>
          <View style={styles.btnContainer}>
            <Button
              onPress={() => navigation.navigate('workouts/add' as never)}
              variant='outlined'
            >
              New Workout
            </Button>
          </View>
          <View style={styles.btnContainer}>
            <Button onPress={() => navigation.navigate('routine/add' as never)}>
              New Routine
            </Button>
          </View>
        </View>
        {workouts.length != 0 && (
          <>
            <Text style={styles.workoutText}>Workouts</Text>
            <WorkoutSlider data={workouts} mode='workout' />
          </>
        )}
        {routines.length != 0 && (
          <>
            <Text style={styles.workoutText}>Routines</Text>
            <WorkoutSlider data={routines} mode='routine' />
          </>
        )}
      </View>
    </Container>
  );
};

export default HomeScreen;
