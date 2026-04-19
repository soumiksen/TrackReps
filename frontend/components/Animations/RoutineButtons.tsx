import Button from '@/components/Button/Button';
import React, { useEffect, useMemo } from 'react';
import { Animated, Easing, View } from 'react-native';

const RoutineButtons = ({
  routines,
  setExerciseList,
  setWorkoutTitle,
  setRoutines,
  setShowBtn
}: any) => {
  const swings = useMemo(
    () => routines.map(() => new Animated.Value(0)),
    [routines]
  );

  useEffect(() => {
    if (routines.length === 0) return;

    const anims = routines.map((_: any, i: any) =>
      Animated.sequence([
        Animated.delay(i * 200),
        Animated.timing(swings[i], {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );

    Animated.stagger(150, anims).start();
  }, [routines, swings]);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      {routines.map((routine: any, i: any) => {
        const translateX = swings[i].interpolate({
          inputRange: [0, 1],
          outputRange: [200, 0],
        });

        const rotate = swings[i].interpolate({
          inputRange: [0, 1],
          outputRange: ['45deg', '0deg'],
        });

        return (
          <Animated.View
            key={routine.id}
            style={{
              transform: [
                { translateX },
                { translateY: -40 },
                { rotate },
                { translateY: 40 },
              ],
              marginLeft: 8,
            }}
          >
            <Button
              onPress={() => {
                setWorkoutTitle(routine.name);
                setExerciseList(routine.exercises);
                setRoutines([]);
                setShowBtn(true)
              }}
              variant='secondary'
            >
              {routine.name}
            </Button>
          </Animated.View>
        );
      })}
    </View>
  );
};

export default RoutineButtons;
