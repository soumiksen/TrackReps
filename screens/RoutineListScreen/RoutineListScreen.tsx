import Container from '@/components/Container/Container';
import GradientBackground from '@/components/GradientBackground/GradientBackground';
import WorkoutCard from '@/components/WorkoutCard/WorkoutCard';
import { AuthContext } from '@/context/AuthContext';
import { getRoutines } from '@/services/routine';
import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const RoutineListScreen = () => {
  const [routines, setRoutines] = useState([]);
  const { uid } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      const res = await getRoutines(uid);
    } catch (e) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRoutines(uid);
        setRoutines(res);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <GradientBackground>
      <Container mode='tab'>
        <View>
          {routines.length == 0 ? (
            <Text>No Workouts</Text>
          ) : (
            routines.map((workout, id) => (
              <View key={id} style={{ marginBottom: 16 }}>
                <WorkoutCard
                  title={workout?.name}
                  id={workout?.id}
                  mode={'routine'}
                />
              </View>
            ))
          )}
        </View>
      </Container>
    </GradientBackground>
  );
};

export default RoutineListScreen;
