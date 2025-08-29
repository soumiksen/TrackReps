import Container from '@/components/Container/Container';
import GradientBackground from '@/components/GradientBackground/GradientBackground';
import WorkoutCard from '@/components/WorkoutCard/WorkoutCard';
import { AuthContext } from '@/context/AuthContext';
import { getWorkouts } from '@/services/workouts';
import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import styles from './WorkoutHIstoryScreen.styles';

const WorkoutHistoryScreen = () => {
  const { uid } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await getWorkouts(uid);
        setWorkouts(res);
        console.log(res)
      } catch (error) {
        console.error('Failed to fetch workouts:', error);
      }
    };
    if (uid) fetchWorkouts();
  }, []);
  return (
    <GradientBackground>
      <Container>
        <Text style={styles.title}>Workout History Screen</Text>
        <View>
          {workouts.length != 0 &&
            workouts.map((workout, id) => (
              <View key={id} style={{ marginBottom: 16 }}>
                <WorkoutCard
                  title={workout?.name}
                  time='1h 50m'
                  volume='1000lbs'
                  list={workout?.list}
                  id={workout?.id}
                  mode={'workout'}
                />
              </View>
            ))}
        </View>
      </Container>
    </GradientBackground>
  );
};

export default WorkoutHistoryScreen;
