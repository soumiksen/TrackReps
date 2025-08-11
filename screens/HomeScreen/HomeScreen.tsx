import Button from '@/components/Button/Button';
import CircularProgress from '@/components/CircularProgressBar/CircularProgressBar';
import Container from '@/components/Container/Container';
import GradientBackground from '@/components/GradientBackground/GradientBackground';
import Paper from '@/components/Paper/Paper';
import VerticalProgressBar from '@/components/VerticalProgressBar/VerticalProgressBar';
import WorkoutCard from '@/components/WorkoutCard/WorkoutCard';
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
    <GradientBackground>
      <Container>
        <View style={styles.titleContainer}>
          <View style={styles.avatar} />
          <View>
            <Text style={styles.welcomeText}>Hi {firstName} 👋</Text>
            <Text style={styles.welcomeSubText}>Wednesday, Aug 13</Text>
          </View>
        </View>
        <Paper>
          <View style={styles.weeklyStatsVertical}>
            <VerticalProgressBar completed={60} />
            <VerticalProgressBar completed={30} />
            <VerticalProgressBar completed={90} />
            <VerticalProgressBar completed={50} />
            <VerticalProgressBar completed={70} />
            <VerticalProgressBar completed={0} />
            <VerticalProgressBar completed={0} />
          </View>
          <Button onPress={() => navigation.navigate('workouts/add' as never)}>
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
                <Text>Reps</Text>
                <Text>Completed</Text>
              </View>
              <Text>43</Text>
            </Paper>
            <Paper fullWidth={true} style={{ gap: 24 }}>
              <View>
                <Text>Weights</Text>
                <Text>Lifted</Text>
              </View>
              <Text>30 lbs</Text>
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
                mode={"workout"}
              />
            </>
          )}
        </View>
      </Container>
    </GradientBackground>
  );
};

export default HomeScreen;
