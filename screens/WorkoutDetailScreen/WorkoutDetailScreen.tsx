import Button from '@/components/Button/Button';
import EditCard from '@/components/EditCard/EditCard';
import ExerciseCard from '@/components/ExerciseCard/ExerciseCard';
import { AuthContext } from '@/context/AuthContext';
import { deleteWorkout, getWorkoutDetail } from '@/services/workouts';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import styles from './WorkoutDetailScreen.styles';

const WorkoutDetailsScreen = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [exerciseTitle, setExerciseTitle] = useState('');
  const [exerciseList, setExerciseList] = useState();
  const [sets, setSets] = useState([{ set: 1, reps: '', lbs: '' }]);

  const [exerciseToEdit, setExerciseToEdit] = useState<any>(null);
  const [editIndex, setEditIndex] = useState<any>(null);

  const { id } = useLocalSearchParams();
  const { uid } = useContext(AuthContext);

  const [title, setTitle] = useState('');

  const navigation = useNavigation<any>();

  const handleEditPress = (exercise: any, index: any) => {
    setExerciseToEdit(exercise);
    setEditIndex(index);
    setExerciseTitle(exercise.title);
    setSets(exercise.sets);
    setShowMenu(true);
  };

  const data = [
    { key: '1', value: 'Upper', disabled: true },
    { key: '2', value: 'Bicep Curl' },
    { key: '3', value: 'Hammer Curl' },
    { key: '4', value: 'Lower', disabled: true },
    { key: '5', value: 'Leg Extension' },
    { key: '6', value: 'Calf Extension' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getWorkoutDetail(uid, id);
        console.log(res);

        setTitle(res.name);
        const formattedData: any = res.exercises.map((item: any) => ({
          title: item.title,
          sets: item.sets,
          id: item.id,
        }));

        setExerciseList(formattedData);
      } catch (err) {
        console.log(err);
      }
    };
    if (uid) fetchData();
  }, [uid]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.exerciseList}>
        <FlatList
          data={exerciseList}
          renderItem={({ item, index }) => (
            <ExerciseCard
              title={item.title}
              sets={item.sets.map((set) => ({
                ...set,
                reps: String(set.reps),
                lbs: String(set.lbs),
              }))}
              onEditPress={() => handleEditPress(item, index)}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      </View>
      {showMenu && (
        <EditCard
          exerciseTitle={exerciseTitle}
          setExerciseTitle={setExerciseTitle}
          exerciseList={exerciseList}
          sets={sets}
          setSets={setSets}
          setShowMenu={setShowMenu}
          data={data}
          mode={editIndex !== null ? 'edit' : 'add'}
          setEditIndex={setEditIndex}
          exerciseToEdit={exerciseToEdit}
          indexToEdit={editIndex}
        />
      )}
      <Button
        onPress={async () => {
          const res = await deleteWorkout(uid, id);
          navigation.navigate('(tabs)')
        }}
      >
        Delete Workout
      </Button>
    </View>
  );
};

export default WorkoutDetailsScreen;
