import Container from '@/components/Container/Container';
import GradientBackground from '@/components/GradientBackground/GradientBackground';
import WorkoutCard from '@/components/WorkoutCard/WorkoutCard';
import { WorkoutContext } from '@/context/WorkoutContext';
import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import styles from './WorkoutHIstoryScreen.styles';

const WorkoutHistoryScreen = () => {
  const { workouts } = useContext(WorkoutContext);

  return (
    <GradientBackground>
      <Container>
        <Text style={styles.title}>Workout History</Text>
        <View>
          {workouts.length == 0 ? (
            <Text>No Workouts</Text>
          ) : (
            workouts.map((workout, id) => (
              <View key={id} style={{ marginBottom: 16 }}>
                <WorkoutCard
                  title={workout?.name}
                  reps={workout?.stats.totalReps}
                  volume={workout?.stats.totalWeight}
                  id={workout?.id}
                  mode={'workout'}
                  duration={workout?.duration}
                />
              </View>
            ))
          )}
        </View>
      </Container>
    </GradientBackground>
  );
};

export default WorkoutHistoryScreen;
