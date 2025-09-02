import Button from '@/components/Button/Button';
import CircularProgress from '@/components/CircularProgressBar/CircularProgressBar';
import Container from '@/components/Container/Container';
import GradientBackground from '@/components/GradientBackground/GradientBackground';
import Paper from '@/components/Paper/Paper';
import VerticalProgressBar from '@/components/VerticalProgressBar/VerticalProgressBar';
import WorkoutCard from '@/components/WorkoutCard/WorkoutCard';
import { AuthContext } from '@/context/AuthContext';
import { WorkoutContext } from '@/context/WorkoutContext';
import { subscribeToMemberStats } from '@/services/workouts';
import { useNavigation } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import styles from './HomeScreen.styles';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { firstName, uid, member } = useContext(AuthContext);
  const { workouts } = useContext(WorkoutContext);

  const [loading, setLoading] = useState(false);
  const [weeklyStats, setWeeklyStats] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);

  const today = new Date();
  const day = today.getDate();
  const dayName = today.toLocaleString('default', { weekday: 'long' });
  const monthName = today.toLocaleString('default', { month: 'short' });

  const jsDay = today.getDay();
  const dayIndex = (jsDay + 6) % 7;

  useEffect(() => {
    if (!uid) return;

    const unsubscribe = subscribeToMemberStats(uid, (liveStats) => {
      if (liveStats) {
        console.log('Live weekly reps:', liveStats?.weeklyReps.reps);

        setWeeklyStats(liveStats.weeklyReps.reps);
        setStats(liveStats);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [uid]);

  if (loading) {
    return (
      <>
        <Text>Loading....</Text>
      </>
    );
  } else {
    return (
      <GradientBackground>
        <Container>
          <View style={styles.titleContainer}>
            <View style={styles.avatar} />
            <View>
              <Text style={styles.welcomeText}>Hi {firstName} 👋</Text>
              <Text style={styles.welcomeSubText}>
                {dayName}, {monthName} {day}
              </Text>
            </View>
          </View>
          <Paper>
            <View style={styles.weeklyStatsVertical}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((label, idx) => (
                <VerticalProgressBar
                  key={idx}
                  completed={weeklyStats ? weeklyStats[idx] : 0}
                  label={label}
                  active={idx === dayIndex}
                />
              ))}
            </View>
            <Button
              onPress={() => navigation.navigate('workouts/add' as never)}
            >
              Add Workout
            </Button>
          </Paper>

          <View style={styles.statsContainer}>
            <View style={styles.statsContainerLeft}>
              <Paper
                fullWidth
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 16,
                }}
              >
                <CircularProgress />
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ marginTop: 8 }}>42 kcal</Text>
                  <Text>Out of 2000 kcal</Text>
                </View>
              </Paper>
            </View>
            <View style={styles.statsContainerRight}>
              <Paper fullWidth style={{ gap: 24 }}>
                <View>
                  <Text style={styles.statsHeader}>Reps</Text>
                  <Text style={styles.statsHeader}>Completed</Text>
                </View>
                <Text style={styles.statsValue}>
                  {stats?.repsCompletedInMonth ?? 0}
                </Text>
              </Paper>
              <Paper fullWidth style={{ gap: 24 }}>
                <View>
                  <Text style={styles.statsHeader}>Weights</Text>
                  <Text style={styles.statsHeader}>Lifted</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 2,
                    alignItems: 'flex-end',
                  }}
                >
                  <Text style={styles.statsValue}>
                    {stats?.weightLiftedInMonth ?? 0}
                  </Text>
                  <Text style={styles.statsUnit}>lbs</Text>
                </View>
              </Paper>
            </View>
          </View>

          <View>
            {workouts.length != 0 && (
              <>
                <Text style={styles.workoutText}>Workouts</Text>
                <WorkoutCard
                  title={workouts[0]?.name}
                  reps={workouts[0]?.stats?.totalReps}
                  volume={workouts[0]?.stats?.totalWeight}
                  id={workouts[0]?.id}
                  mode={'workout'}
                />
              </>
            )}
          </View>
          <Button onPress={() => navigation.navigate('routine/add' as never)}>
            Add Routine
          </Button>
        </Container>
      </GradientBackground>
    );
  }
};

export default HomeScreen;
