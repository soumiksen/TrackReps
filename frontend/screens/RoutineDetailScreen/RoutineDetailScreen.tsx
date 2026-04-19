import Button from '@/components/Button/Button';
import Container from '@/components/Container/Container';
import EditCard from '@/components/EditCard/EditCard';
import ExerciseCard from '@/components/ExerciseCard/ExerciseCard';
import { AuthContext } from '@/context/AuthContext';
import { deleteRoutine, getRoutineDetail, updateExercise } from '@/services/routine';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import styles from './RoutineDetailScreen.styles';

const RoutineDetailScreen = () => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRoutineDetail(uid, id as string);
        console.log(res);

        setTitle(res?.name);
        const formattedData: any = res?.exercises.map((item: any) => ({
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
    <Container mode='tab'>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.exerciseList}>
        <FlatList
          data={exerciseList}
          renderItem={({ item, index }) => (
            <ExerciseCard
              title={item.title}
              sets={item.sets.map((set:any) => ({
                ...set,
                reps: String(set.reps),
                lbs: String(set.lbs),
              }))}
              onEditPress={() => handleEditPress(item, index)}
              mode='routine'
              exerciseID={item.id}
              userID={uid}
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
          setExerciseList={setExerciseList}
          sets={sets}
          setSets={setSets}
          setShowMenu={setShowMenu}
          mode={editIndex !== null ? 'edit' : 'add'}
          setEditIndex={setEditIndex}
          exerciseToEdit={exerciseToEdit}
          indexToEdit={editIndex}
          variant='routine'
          onSave={async (updatedList) => {
            await updateExercise(uid, id as string, {
              name: title,
              exercises: updatedList,
            });
          }}
        />
      )}
      <Button onPress={() => navigation.navigate('routine/edit', { id })}>
        Edit Routine
      </Button>
      <Button
        onPress={async () => {
          const res = await deleteRoutine(uid, id);
          navigation.navigate('(tabs)');
        }}
      >
        Delete Routine
      </Button>
    </Container>
  );
};

export default RoutineDetailScreen;
