import Button from '@/components/Button/Button';
import CircularProgress from '@/components/CircularProgressBar/CircularProgressBar';
import Container from '@/components/Container/Container';
import GradientBackground from '@/components/GradientBackground/GradientBackground';
import Paper from '@/components/Paper/Paper';
import VerticalProgressBar from '@/components/VerticalProgressBar/VerticalProgressBar';
import WorkoutCard from '@/components/WorkoutCard/WorkoutCard';
import { AuthContext } from '@/context/AuthContext';
import { getRoutines } from '@/services/routine';
import { getWeeklyStats, getWorkouts } from '@/services/workouts';
import { useNavigation } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import styles from './HomeScreen.styles';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { firstName, uid, member } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [routines, setRoutines] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState<any[]>([]);

  const today = new Date();
  const day = today.getDate();
  const dayName = today.toLocaleString('default', { weekday: 'long' });
  const monthName = today.toLocaleString('default', { month: 'short' });

  const jsDay = today.getDay();
  const dayIndex = (jsDay + 6) % 7;

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);

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

        const res3 = await getWeeklyStats(uid);
        setWeeklyStats(res3?.statsByDay ?? []);

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch workouts:', error);
      }
    };

    if (uid) fetchWorkouts();
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
                  completed={weeklyStats[idx]?.reps ?? 0}
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
                fullWidth={true}
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
              <Paper fullWidth={true} style={{ gap: 24 }}>
                <View>
                  <Text style={styles.statsHeader}>Reps</Text>
                  <Text style={styles.statsHeader}>Completed</Text>
                </View>
                <Text style={styles.statsValue}>
                  {member?.repsCompletedInMonth ?? 0}
                </Text>
              </Paper>
              <Paper fullWidth={true} style={{ gap: 24 }}>
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
                    {member?.weightLiftedInMonth}
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
                  title={workouts[0]?.title}
                  time='1h 50m'
                  volume='1000lbs'
                  list={workouts[0]?.list}
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
